import React, {useEffect, useState} from "react";
import "react-native-gesture-handler";
import {StatusBar} from "expo-status-bar";
import {Dimensions, StyleSheet, Text, View, FlatList} from "react-native";
import {Appbar, Button} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import Product from "../components/Product";
import {getAdverts, reset} from "../services/advert/advertSlice";
import {theme} from "../constants";
import {IconButton} from "react-native-paper";

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);
  const {adverts, isLoading, isError, isSuccess, message} =
    useSelector((state) => state.advert);
  const [condition, setCondition] =
    useState({keyword: "Statistics", category: "Science"});
  const {keyword, category} = condition;

  const windowDimensions = Dimensions.get("window");
  const screenDimensions = Dimensions.get("screen");

  const renderProduct = ({item, index}) => {
    return (
      <Product key={item._id} {...item} index={index}
        onPress={() => {
          navigation.navigate("DetailsScreen", {
            item: item,
            // productId: product.id,
          });
        }}
      />
    );
  };

  useEffect(() => {
    console.log("HomeScreen::useEffect()");
    console.log("screen :" + screenDimensions.width + "x" +
      screenDimensions.height);
    console.log("window:" + windowDimensions.width + "x" +
     windowDimensions.height);
    dispatch(getAdverts({params: {keyword: keyword, category: category}}));
  }, []);


  useEffect(() => {
    console.log("HomeScreen::useEffect - navigation");
    navigation.setOptions({
      headerRight: () => (
        <>
          <IconButton
            size={20}
            backgroundColor="lightgrey"
            icon="magnify"
            onPress={() => {
              navigation.navigate("SearchScreen", {});
            }}
          />
          <IconButton
            size={20}
            backgroundColor="lightgrey"
            icon="plus"
            onPress={() => {
              navigation.navigate("CreationScreen", {});
              // alert("Camera")
            }}
          />
        </>
      ),
    });
  }, [navigation]);

  return (
    <View
      style={styles.container}
    >
      <StatusBar />
      <FlatList
        numColumns={2}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={styles.productsList}
        contentContainerStyle={styles.productsListContainer}
        keyExtractor={(product) => product._id}
        data={adverts}
        renderItem={renderProduct}
        onRefresh={() => {
          dispatch(getAdverts(condition));
        }}
        refreshing={false}
        // maxToRenderPerBatch={6}
      />

      { /*
  */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
    // backgroundColor: 'green',
  },
  header: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    // color: '#686868',
    // buttonColor: '#686868',
  },
  productsList: {
    marginTop: 0,
    // backgroundColor: 'yellow',
    flex: 1,
    // alignItems: 'space-between',
    height: 840,
  },
  productsListContainer: {
    backgroundColor: "#eeeeee",
    paddingVertical: 0,
    marginHorizontal: 0,
  },
});
export default HomeScreen;
