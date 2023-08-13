import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import {SafeAreaView, View, StyleSheet, FlatList} from "react-native";
import {Text, Button, Searchbar, TextInput, ActivityIndicator} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {search, reset} from "../../services/advert/advertSearchSlice";
import ListingItem, {renderListingItem} from "../../components/ListingItem";
import {theme} from "../../constants";


const SearchScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const searchRef = useRef();

  const {adverts, isLoading, isError, isSuccess, message} =
    useSelector((state) => state.advertSearch);

  const handleChangeText= (query) => {
    console.log("handleChangeText: " + query);
    setSearchQuery(query);
  };

  const handleSearch = () => {
    if (searchQuery === "") {
      return;
    }
    dispatch(search({params: {keyword: searchQuery}}));
  };

  useLayoutEffect(() => {
    searchRef.current.focus();
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

  return (
    <SafeAreaView
      style={[theme.STYLE.container, styles.container]}>

      <View style={theme.STYLE.row}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Search"
          onChangeText={handleChangeText}
          value={searchQuery}
          onBlur={handleSearch}
          ref={searchRef}

        />
      </View>
      { isLoading &&
        <View style={[theme.STYLE.row, styles.loading]}>
          <ActivityIndicator animating={isLoading} />
        </View>
      }
      <View style={[theme.STYLE.row, {}]}>
        { adverts.length > 0 ? (
        <FlatList
          numColumns={2}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.productsList}
          contentContainerStyle={styles.productsListContainer}
          columnWrapperStyle={{marginTop: 0}}
          keyExtractor={(item) => item._id}
          data={adverts}
          renderItem={({item, index}) => (
            <ListingItem key={item._id} {...item} index={index}
              onPress={() => {
                navigation.navigate("DetailsScreen", {
                  item: item,
                  // productId: product.id,
                });
              }}
            />
          )}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
  },
  searchBar: {
    color: "grey",
    backgroundColor: "#ffffff",
    flex: 1,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  loading: {
    marginTop: 5,
  },
  productsList: {
    marginTop: 5,
    // backgroundColor: 'yellow',
    flex: 1,
    // alignItems: 'space-between',
    // height: 840,
  },
  productsListContainer: {
    // backgroundColor: "#eeeeee",
    paddingVertical: 0,
    marginHorizontal: 0,
  },

});

export default SearchScreen;
