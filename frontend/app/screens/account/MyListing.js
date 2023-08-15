import React, {useEffect} from "react";
import {View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity}
  from "react-native";
import {Text, Button, ActivityIndicator, Avatar} from "react-native-paper";
import {logout} from "../../services/auth/authSlice";
import {useSelector, useDispatch} from "react-redux";
import MyListingItem from "../../components/MyListingItem";
import {getMyAdverts, reset} from "../../services/advert/advertMySlice";
import {theme} from "../../constants";
import {StatusBar} from "expo-status-bar";
import data from "./static.json";

import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FIcon from "react-native-vector-icons/Feather";

FAIcon.loadFont();
MDIcon.loadFont();
MCIcon.loadFont();
FIcon.loadFont();

const MyListing = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {adverts, isLoading, isError, isSuccess, message} =
   useSelector((state) => state.advertMy);
  const {user} = useSelector((state) => state.auth);
  const condition = {params: {userId: user._id}};

  const renderListingItem = ({item}) => {
    return (
      <ListingItem key={item._id} {...item}
        onPress={() => {
          // navigation.navigate('ListingItemDetails', {
          //  item: item,
          // productId: product.id,
          // });
        }}
      />
    );
  };

  React.useLayoutEffect(() => {
    console.log("ProfileScreen::useLayoutEffect()");
    dispatch(getMyAdverts(condition));
  }, [navigation]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (isSuccess) {

    }
  }, [isSuccess]);

  return (

    <SafeAreaView style={[theme.STYLE.container, styles.container]}>
      <StatusBar />
      <View style={styles.mylisting}>
        <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={styles.productsList}
          contentContainerStyle={styles.productsListContainer}
          keyExtractor={(product) => product._id}
          data={adverts}
          renderItem={({item}) => (
            <MyListingItem key={item._id} {...item}
              onPress={() => {
              // navigation.navigate('ListingItemDetails', {
              //  item: item,
              // productId: product.id,
              // });
              }}
            />)}
          onRefresh={() => {
            dispatch(getMyAdverts(condition));
          }}
          refreshing={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  row: {

    productsList: {
      marginTop: 0,
      // backgroundColor: 'yellow',
    },
    productsListContainer: {
      // backgroundColor: "#eeeeee",
      paddingVertical: 0,
      marginHorizontal: 0,
    },
  },
  avatar: {
    marginTop: 20,
  },
  info: {
    flexDirection: "column",
    paddingTop: 10,
    width: "100%",
  },
  name: {
    // flex: 1,
  },
  email: {
    // flex: 1,
  },
  button: {
    margin: 10,
    flex: 1,
  },
  info2: {
    flexDirection: "row",
    paddingTop: 50,
    paddingLeft: 50,
    flex: 1,
  },
  mylisting: {
    flex: 3,
    // backgroundColor: "#00FF00",
  },
  loading: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default MyListing;
