import React, {useState, useEffect} from "react";
import {View, StyleSheet, TextInput, FlatList} from "react-native";
import {Text, Button, Searchbar} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {search, reset} from "../../services/advert/advertSearchSlice";
import Product from "../../components/ListingItem";
import {theme} from "../../constants";
import {StatusBar} from "expo-status-bar";

const SearchScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState("");

  const {adverts, isLoading, isError, isSuccess, message} =
    useSelector((state) => state.advertSearch);
  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSubmitEditing = () => {
    console.log("query: " + searchQuery);
    dispatch(search({params: {keyword: searchQuery}}));
  };

  React.useLayoutEffect(() => {
    dispatch(reset());
  }, [navigation]);

  useEffect(() => {
    console.log("SearchScreen::useEffect[isSuccess");
    if (isError) {
      console.log(message);
    }
  }, [isError]);

  useEffect(() => {
    console.log("SearchScreen::useEffect[isSuccess]");
    if (isSuccess) {
      console.log(JSON.stringify(adverts ));
    }
  }, [isSuccess]);

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

  return (
    <View style={theme.STYLE.container}>
      <View style={theme.STYLE.row}>
        <Searchbar
          style={styles.searchBar}
          placeholder='Search'
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={handleSubmitEditing}
        />
      </View>
      { adverts.length > 0 ? (
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
            dispatch(search({params: {keyword: searchQuery}}));
          }}
          refreshing={false}
          // maxToRenderPerBatch={6}
        />
        ) : (
          <View style={{...theme.STYLE.sub, alignItems: "center"}} >
            <Text variant='bodyLarge'>No listings</Text>
          </View>
        ) }
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#ffffff",
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
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
    marginTop: 10,
    // backgroundColor: 'yellow',
    flex: 1,
    // alignItems: 'space-between',
    height: 840,
  },
  productsListContainer: {
    justifyContent: "flex-start",
    backgroundColor: "#eeeeee",
    paddingVertical: 0,
    marginHorizontal: 0,
  },

});

export default SearchScreen;
