import React, {useState, useEffect, useLayoutEffect, useRef} from "react";
import {SafeAreaView, View, StyleSheet, FlatList} from "react-native";
import {Text, Searchbar, ActivityIndicator} from "react-native-paper";
import {useDispatch, useSelector} from "react-redux";
import {search, searchMore, reset}
  from "../../services/advert/advertSearchSlice";
import ListingItem from "../../components/ListingItem";
import {theme} from "../../constants";


const SearchScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const searchRef = useRef();

  const {adverts, isLoading, isError, isSuccess, message} =
    useSelector((state) => state.advertSearch);

  const initCondition =
  {keyword: "", category: "Science", offset: 0, limit: 8};
  const [condition, setCondition] = useState(initCondition);

  const handleSearch = () => {
    if (condition.keyword === "") {
      return;
    }
    dispatch(search({...condition, offset: 0}));
    setCondition((prev) => ({...prev, offset: 0}));
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

  const loadMore = () => {
    if (condition.offset + condition.limit > adverts.length) {
      return;
    }
    console.log("SearchScreen::loadMore() - " + condition.offset + ", " +
     condition.limit);
    dispatch(searchMore({...condition,
      offset: condition.offset + condition.limit}));

    setCondition((prev) => ({...condition, offset: prev.offset + prev.limit}));
  };

  return (
    <SafeAreaView
      style={[theme.STYLE.container, styles.container]}>

      <View style={theme.STYLE.row}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Enter a keyword here"
          onChangeText={(text) => {
            setCondition((prev) => ({...prev, keyword: text}));
          }}
          value={condition.keyword}
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
                navigation.navigate("DetailsScreen", {item: item});
              }}
            />
          )}
          onRefresh={() => {
            dispatch(search({params: {...condition, offset: 0}}));
            setCondition((prev) => ({...prev, offset: 0}));
          }}
          refreshing={false}
          // maxToRenderPerBatch={6}
          onEndReachedThreshold={0.1}
          onEndReached={loadMore}
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
