import React, {useState, useEffect, useRef} from "react";
import {Text, View, StyleSheet, SafeAreaView, FlatList} from "react-native";
import {useSelector, useDispatch} from "react-redux";
import Toast from "react-native-toast-message";
import BookmarkItem from "./BookmarkItem";
import {theme} from "../../constants";
import {getBookmarks, resetBMState}
  from "../../services/advert/advertMySlice";
import {Button} from "react-native-paper";


const BookmarkScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {bookmarks, isLoading, isError, isSuccess} =
    useSelector((state) => state.advertMy);

  useEffect(() => {
    console.log("BookmarkScreen::useEffect()");
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
    });

    dispatch(getBookmarks({}));
    return unsubscribe;
  }, [navigation]);


  return (
    <SafeAreaView style={[theme.STYLE.container, styles.container]}>
      <View style={[theme.STYLE.row, styles.mylisting]}>
        <FlatList
          numColumns={1}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => item._id}
          data={bookmarks}
          renderItem={({item}) => (
            <BookmarkItem key={item._id}
              item={item}
              onPress={() => {
                navigation.navigate("DetailsScreen", {
                  item: item,
                  // productId: product.id,
                });
              }}
              onSold={() => {}}
              onDelete={() => {}}
              onUnSave={(data) => {
                // dispatch(resetStatusState());
                // dispatch(updateStatus({params: {id: item._id, ...data}}));
              }}
            />)}
          onRefresh={() => {
            dispatch(getBookmarks({}));
          }}
          refreshing={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  row: {
  },
  mylisting: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  list: {
    flex: 1,
    height: "100%",
  },
  contentContainer: {
  },

});

export default BookmarkScreen;
