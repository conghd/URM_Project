import React, {useEffect} from "react";
import {View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity}
  from "react-native";
import {Text, Button, ActivityIndicator, Avatar} from "react-native-paper";
import {logout} from "../../services/auth/authSlice";
import {useSelector, useDispatch} from "react-redux";
import ListingItem from "../../components/ListingItem";
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

const ProfileScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {adverts, isLoading, isError, isSuccess, message} =
   useSelector((state) => state.advertMy);
  const {user} = useSelector((state) => state.auth);

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
  }, [navigation]);

  useEffect(() => {
  }, []);

  useEffect(() => {
    if (isSuccess) {

    }
  }, [isSuccess]);

  const handleSignOut= (e) => {
    console.log("ProfileScreen::handleSignOut");
    dispatch(logout());
  };

  return (

    <SafeAreaView style={[theme.STYLE.container, styles.container]}>
      <StatusBar />
      <View style={[theme.STYLE.row, styles.avatar]}>
        <Avatar.Image size={128}
          source={require("../../../assets/user3.jpeg")}/>
      </View>
      <View style={[theme.STYLE.row, styles.info]}>
        <Text style={styles.name}>{user.name}</Text>
        <Text styles={styles.email}>{user.email}</Text>
      </View>
      <View style={[theme.STYLE.row, styles.info]}>
        <View style={styles.listContainer}>
          {data.lists.map((list) => (
            <TouchableOpacity
              key={list.icon}
              style={styles.listButton}
              onPress={() => {
                if (list.screen) {
                  navigation.navigate(list.screen, {});
                }
              }}
            >
              {list.type == "FIcon" ? (
                <FIcon name={list.icon} style={styles.listIcon} />
              ) : (
                <MCIcon name={list.icon} style={styles.listIcon} />
              )}
              <Text style={styles.listLabel}>{list.label}</Text>
              <View style={styles.rightIcon}>
                <FAIcon name="angle-right"
                  style={[styles.listIcon, {width: 10}]} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[theme.STYLE.row, {position: "absolute", bottom: 20}]}>
        <Button
          style={styles.button}
          // icon="camera"
          mode="outlined"
          onPress={() => handleSignOut() }
        >
          Sign Out
        </Button>
      </View>
      <View style={styles.mylisting}>
        {/**
        <FlatList
          numColumns={2}
          horizontal={false}
          style={styles.productsList}
          contentContainerStyle={styles.productsListContainer}
          keyExtractor={(product) => product._id}
          data={adverts}
          renderItem={renderListingItem}
          onRefresh={() => {
            dispatch(getMyAdverts(condition));
          }}
          refreshing={false}
        />

       */}
      </View>
      {/**
        */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  row: {

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
  listContainer: {
    alignItems: "flex-start",
    padding: 25,
    width: "100%",
  },
  listTitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    width: "100%",
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60,
  },
  listLabel: {
    fontSize: 16,
  },
  rightIcon: {
    marginRight: 0,
    flex: 1,
    alignItems: "flex-end",
  },
});

export default ProfileScreen;
