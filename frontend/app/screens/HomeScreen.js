import React, {useEffect, useState} from "react";
import {StatusBar} from "expo-status-bar";
import {Dimensions, StyleSheet, View, FlatList,
  SafeAreaView} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ListingItem from "../components/ListingItem";
import {getAdverts, getMoreAdverts} from "../services/advert/advertSlice";
import {theme} from "../constants";

const windowDimensions = Dimensions.get("window");
const screenDimensions = Dimensions.get("screen");

const HomeScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {adverts, isLoading, isError, isSuccess, message} =
    useSelector((state) => state.advert);

  const initCondition =
  {keyword: "Statistics", category: "Science", offset: 0, limit: 8};
  const [condition, setCondition] = useState(initCondition);

  const renderListingItem= ({item, index}) => {
    return (
      <ListingItem key={item._id} {...item} index={index}
        onPress={() => {
          navigation.navigate("DetailsScreen", {
            item: item,
            // productId: product.id,
          });
        }}
      />
    );
  };

  const handleRefresh = () => {
    console.log("HomeScreen::handleRefresh()");
    dispatch(getAdverts({params: initCondition}));
    setCondition((prev) => ({...prev, offset: 0}));
  };

  const loadMore = () => {
    if (condition.offset + condition.limit > adverts.length) {
      return;
    }
    console.log("HomeScreen::loadMore() - " + condition.offset + ", " +
     condition.limit);
    dispatch(getMoreAdverts({params: {...condition,
      offset: condition.offset + condition.limit}}));

    setCondition((prev) => ({...condition, offset: prev.offset + prev.limit}));
  };

  useEffect(() => {
    console.log("HomeScreen::useEffect()");
    dispatch(getAdverts({params: initCondition}));
  }, []);


  useEffect(() => {
    console.log("HomeScreen::useEffect - navigation");

    navigation.setOptions({
    });
  }, [navigation]);

  return (
    <SafeAreaView
      style={[theme.STYLE.container, styles.container]}
    >
      <StatusBar />
      <View style={[theme.STYLE.row, styles.row]}>
        <FlatList
          numColumns={2}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.productsList}
          contentContainerStyle={styles.productsListContainer}
          columnWrapperStyle={{marginTop: 5}}
          keyExtractor={(listingItem) => listingItem._id}
          data={adverts}
          renderItem={renderListingItem}
          onRefresh={() => {
            handleRefresh();
          }}
          refreshing={false}
          // maxToRenderPerBatch={6}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            loadMore();
          }}
        />
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginLeft: 5,
    marginRight: 5,
  },
  row: {
    backgroundColor: "transparent",
  },
  button: {
    // color: '#686868',
    // buttonColor: '#686868',
  },
  productsList: {
    marginTop: 0,
    // backgroundColor: 'yellow',
  },
  productsListContainer: {
    // backgroundColor: "#eeeeee",
    paddingVertical: 0,
    marginHorizontal: 0,
  },
});
export default HomeScreen;
