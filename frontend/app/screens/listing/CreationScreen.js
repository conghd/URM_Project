import React, {useEffect, useLayoutEffect, useState, useRef} from "react";
import {useSelector, useDispatch} from "react-redux";
import {View, StyleSheet, ScrollView, FlatList,
  ImageBackground, TouchableOpacity, Alert,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import {Button, Divider, HelperText, IconButton, TextInput} from "react-native-paper";
import ImagePreviewItem from "../ImagePreviewItem";
import * as ImagePicker from "expo-image-picker";
import {createAdvert, reset} from "../../services/advert/advertCreationSlice";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {theme} from "../../constants";
import {StatusBar} from "expo-status-bar";

const CreationScreen = ({navigation, route}) => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const {book} = route.params;

  const listRef = useRef();
  const {user} = useSelector((state) => state.auth);
  /*
  const [formData, setFormData] = useState({
    title: "Statistics II",
    price: 10.0,
    description: "This is the main textbook for Statistics II.",
    phoneNumber: "(306)666-8899",
    location: "Regina",
    category: "Computer Science",
    condition: "Like new",
  });
  */

  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    publisher: "",
    publishedDate: "",
    pageCount: "",
    ISBN: "",
    category: "",

    price: "0",
    description: "",
    phoneNumber: "1111111",
    location: "Regina, SK",
    condition: "Like New",
  });
  const [images, setImages] = useState([
    {id: 0, uri: ""},
  ]);

  const {title, authors, publisher, publishedDate, pageCount, ISBN,
    price, description, phoneNumber, location, category,
    condition} = formData;

  const {isLoading, isError, isSuccess, message} =
    useSelector((state) => state.advertCreation);

  const handleTextChange = (value) => {
    return setFormData((prev) => {
      return {...prev, ...value};
    });
  };

  const handleSubmit = () => {
    console.log("onSubmit: " + JSON.stringify(formData));
    const form = new FormData();
    form.append("title", title);
    form.append("price", price);
    form.append("description", description);
    form.append("phoneNumber", phoneNumber);
    form.append("location", location);
    form.append("category", category);
    form.append("condition", condition);

    Object.values(images).forEach((image) => {
      if (image.id != 0) {
        const uriParts = image.uri.split(".");
        const fileType = uriParts[uriParts.length - 1];
        form.append("images", {
          uri: image.uri,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        });
      }
    });
    dispatch(createAdvert(form));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: (props) => (
        <Button mode="text" onPress={() => {
          navigation.goBack();
        }}
        >Cancel</Button>
      ),
      headerRight: (props) => (
        <Button mode="text">Publish</Button>
      ),
      title: "New Listing",
      // headerBackVisible: false,
    });

    dispatch(reset());
  }, [navigation]);
  useEffect(() => {
    console.log("ProductCreationScreen::useEffect[]");
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (isSuccess) {
      // Alert.alert("Success", "The new listing has been created successfully");
      // navigation.navigate("Main", {screen: "Home"});
      navigation.navigate("Home", {});
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      Alert.alert("Failure",
          "The new listing has been NOT created. Please try again");
    }
  }, [isError]);

  useEffect(() => {
    if (route.params?.book) {
      console.log("CreationScreen::useEffect(): " +
        JSON.stringify(route.params.book));
      setFormData((prev) => {
        return {...prev,
          title: book.title,
          authors: book.authors.join(", "),
          publisher: book.publisher,
          publishedDate: book.publishedDate,
          pageCount: `${book.pageCount}`,
          ISBN: book.ISBN,
          category: book.categories.join(", "),
        };
      });
    }
  }, [route.params?.book]);

  const handleDeleteImage = (id) => {
    console.log("handleDeleteImage: " + id);
    setImages((current) => current.filter((e) => e.id != id));
  };

  const handleImgPress = async (id) => {
    if (id != 0) {
      return;
    } else if (images.length >= 11) {
      Alert.alert("Notice", "You reach the maximum number of images.");
      return;
    }
    /*
    let result = await ImagePicker.launchCameraAsync({

    })
    */
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);
    if (!result.canceled) {
      const selectedImages = result.assets.map((item) => {
        return {id: item.assetId, uri: item.uri,
          width: item.width, height: item.height};
      });
      const assetIds = images.map((item) => {
        return item.id;
      });
      const newImages = selectedImages.filter((image) =>
        (assetIds.indexOf(image.id) == -1),
      );

      if (images.length + newImages.length > 11) {
        // Alert.alert("Warn", "Exceed 10 images");
        Alert.alert("Success", "The new listing has been created successfully");
      }

      setImages((current) => {
        return [
          ...current.slice(0, -1),
          ...newImages.slice(0, 11-current.length),
          current.at(-1),
        ];
      });
      setTimeout(() => {
        listRef.current.scrollToEnd({animated: true});
      }, 1000);
    }
  };

  const renderImagePreview = ({item}) => {
    return (
      <ImagePreviewItem
        key={item.id}
        item={item}
        handlePress={handleImgPress}
        handleDeleteImage={handleDeleteImage}
      />
    );
  };

  return (
    <View style={theme.STYLE.container}>
      <KeyboardAwareScrollView
        style={theme.STYLE.scrollView}
        extraHeight={100}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[theme.STYLE.row, styles.row]}>
          <FlatList
            style={styles.imgList}
            contentContainerStyle={{justifyContent: "space-between"}}
            horizontal={true}
            data={ images }
            renderItem={ renderImagePreview }
            keyExtractor={(item) => item.id}
            extraData={selectedId}
            showsVerticalScrollIndicator ={false}
            showsHorizontalScrollIndicator={false}
            ref={listRef}
          />
        </View>
        <View style={[theme.STYLE.row, {marginTop: 0}]} >
          <HelperText>
            Photo: {images.length-1}/10 &#183; Choose your listing&apos;s main photo first.
          </HelperText>
        </View>

        <View style={[theme.STYLE.row, styles.row]} >
          <Button
            style={styles.button}
            icon="barcode-scan"
            mode="outlined" onPress={() => {
              navigation.navigate("ScannerScreen");
            }} >Scan ISBN</Button>

        </View>
        <View style={[theme.STYLE.row, {marginTop: 0}]} >
          <HelperText>
            Scan the ISBN to accelerate publishing your listing (optional).
          </HelperText>
        </View>

        {/** BOOK TITLE */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Title" value={title} mode="outlined"
            onChangeText={(text) => {
              handleTextChange({title: text});
            }} />
        </View>

        {/** BOOK AUTHORS */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Authors" value={authors}
            onChangeText={(text) => {
              handleTextChange({authors: text});
            }}
            mode="outlined"
          />
        </View>

        {/** PUBLISHER */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Publisher" value={publisher}
            onChangeText={(text) => {
              handleTextChange({publisher: text});
            }}
            mode="outlined"
          />
        </View>

        {/** PUBLISHED DATE */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Published Date" value={publishedDate}
            onChangeText={(text) => {
              handleTextChange({publishedDate: text});
            }}
            mode="outlined"
          />
        </View>
        {/** PAGE COUNT */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="ISBN" value={ISBN}
            onChangeText={(text) => {
              handleTextChange({ISBN: text});
            }}
            mode="outlined"
            selectionColor="gray"
          />
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Page Count" value={pageCount}
            onChangeText={(text) => {
              handleTextChange({pageCount: text});
            }}
            mode="outlined"
          />
        </View>
        {/** CATEGORY */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]} mode="outlined"
            label="Category" value={category} editable={false}
            onChangeText={(text) => {
              handleTextChange({category: text});
            }}
            onPressIn={() => console.log("Press")}
            right={<TextInput.Icon icon="menu-down" />}
          />
        </View>

        <Divider style={theme.STYLE.divider} />
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Description" value={description}
            onChangeText={(text) => {
              handleTextChange({description: text});
            }}
            mode="outlined" multiline={true}
          />
        </View>
        {/** LOCATION */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Location" value={location}
            onChangeText={(text) => {
              handleTextChange({location: text});
            }}
            mode="outlined"
          />
        </View>
        {/** CONDITION & PRICE */}
        <View style={[theme.STYLE.row, styles.row]}>
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]} mode="outlined"
            label="Condition" value={condition} onChangeText={(text) => {
              handleTextChange({condition: text});
            }}
            editable={false}
            onPressIn={() => {
              console.log("onPressIn");
            }}
            right={<TextInput.Icon icon="menu-down" />}

          />
          <TextInput
            style={[theme.STYLE.textInput, styles.textInput]}
            label="Price" value={`${price}`}
            onChangeText={(text) => {
              handleTextChange({price: text});
            }}
            keyboardType="decimal-pad"
            mode="outlined"
          />
        </View>
        <View style={{flex: 1, margin: 10, marginBottom: 40}}>
          <Button mode="contained"
            onPress={() => handleSubmit()} >Submit</Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  row: {
    marginTop: 10,
  },
  imageSection: {
    flexDirection: "column",
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "silver",
    margin: 5,
    // backgroundColor: "#ababab",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  button: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  imgList: {
    // backgroundColor: "#aaaaff",
  },
  inputSection: {
    flex: 3,
    // backgroundColor: "#dedede",
  },

  input: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
});

export default CreationScreen;
