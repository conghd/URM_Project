import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SafeAreaView, Text, View, StyleSheet, ScrollView, FlatList, ImageBackground, TouchableOpacity, Alert,
} from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import ImagePreviewItem from './ImagePreviewItem';
import * as ImagePicker from 'expo-image-picker';
import { createAdvert, reset } from '../services/advert/advertCreationSlice';

const ProductCreationScreen = ({ navigation, route }) => {
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const {user } = useSelector((state) => state.auth);
  const [firstTime, setFirstTime] = useState(true);
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
    price: 0,
    description: "",
    phoneNumber: "1111111",
    location: "",
    category: "",
    condition: "",
  });
  const [images, setImages] = useState([
    {id: 0, uri: "" },
  ]);

  const {title, price, description, phoneNumber, location, category, condition} = formData;

  const {isLoading, isError, isSuccess, message } = useSelector((state) => state.advertCreation)

  const handleTextChange = (value) => {
    return setFormData((prev) => {
      return {...prev, ...value}
    });
  };

  const handleSubmit = () => {
    console.log("onSubmit: " + JSON.stringify(formData));
    console.log("title: " + title);
    console.log("price: " + price);
    console.log("description: " + description);
    console.log("category: " + category);
    console.log("condition: " + condition);
    let form = new FormData();
    form.append("title", title);
    form.append("price", price);
    form.append("description", description);
    form.append("phoneNumber", phoneNumber);
    form.append("location", location);
    form.append("category", category);
    form.append("condition", condition);

    Object.values(images).forEach((image) => {
      if (image.id != 0) {
        let uriParts = image.uri.split(".");
        let fileType = uriParts[uriParts.length - 1];
        form.append("images", {
          uri: image.uri,
          name: `image.${fileType}`,
          type: `image/${fileType}`,
        });
      }
    })
    dispatch(createAdvert(form));
  }

  useEffect(() => {
    console.log("ProductCreationScreen::useEffect[]");
    dispatch(reset());

  }, []);

  useEffect(() => {
    if (isSuccess) {
        Alert.alert("Success", "The new listing has been created successfully");
        navigation.navigate("Main", {screen: "Home"});
    }

  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
        Alert.alert("Failure", "The new listing has been NOT created. Please try again");
    }
  }, [isError]);
  
  /*
  useEffect(() => {
    if (firstTime) {
      dispatch(reset());
      setTimeout(() => {
      
      }, 1000);

      setFirstTime(false);
    }

    if (isSuccess) {
      setTimeout(() => {
        Alert.alert("Success", "The new listing has been created successfully");
        navigation.navigate("Home");
      }, 1000);
    }

    return(() => {
      dispatch(reset());
    })
  }, [isError, isSuccess]);
*/
  const handleDeleteImage = (id) => {
    console.log("handleDeleteImage: " + id);
    setImages((current) => current.filter((e) => e.id != id));
  }

  const handleImgPress = async (id) => {
    console.log("handleImgPress");

    /*
    let result = await ImagePicker.launchCameraAsync({

    })
    */
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);
    if (!result.canceled) {
      if (result.selected) {
        let newImages = result.selected.map((item) => {return {id: item.assetId, uri: item.uri}});
        setImages((current) => { return [...current, ...newImages]})
      } else {
        setImages((current) => { return [...current, {id: result.assetId, uri: result.uri}]});
      };
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
  }
    return (
        <ScrollView style={styles.container}>
        <View style={styles.imageSection}>
          <FlatList
                  style={styles.imgList}
                  horizontal={true}
                  data={ images }
                  renderItem={ renderImagePreview }
                  keyExtractor={(item) => item.id}
                  extraData={selectedId}
                  showsVerticalScrollIndicator ={false}
                  showsHorizontalScrollIndicator={false}
              />

        </View>
        <View style={styles.inputSection} >
        <View style={styles.input}>
          <TextInput label="Title" value={title}
          onChangeText={text => {handleTextChange({title: text})}}
          mode="outlined" outlineColor='red'
          />
        </View>
        <View style={styles.input}>
          <TextInput label="Description" value={description}
          onChangeText={text => { handleTextChange({description: text})}}
          mode="outlined" multiline={true} numberOfLines={3}
          />
        </View>
        <View style={styles.input}>
          <TextInput label="Price" value={price}
          onChangeText={text => { handleTextChange({price: text })}}
          keyboardType="number-pad"
          mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput label="Location" value={location}
          onChangeText={text => { handleTextChange({location: text })}}
          mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput label="Category" value={category} onChangeText={text => { handleTextChange({category: text})}}
          mode="outlined"
          />
        </View>
        <View style={styles.input}>
          <TextInput label="Condition" value={condition} onChangeText={text => { handleTextChange({condition: text })}}
          mode="outlined"
          />
        </View>
        </View>
        <View style={{flex: 1, margin: 10 }}>
          <Button mode="contained" onPress={() => handleSubmit()} >Submit</Button>
        </View>
        </ScrollView>
      );
  };

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  imageSection: {
    flexDirection: 'column',
    flex: 1,
    //backgroundColor: "#ababab",
  },
  imgList: {
    //backgroundColor: "#aaaaff",

  },
  inputSection: {
    flex: 3,
    //backgroundColor: "#dedede",
  },

  input: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
  },
});

export default ProductCreationScreen;