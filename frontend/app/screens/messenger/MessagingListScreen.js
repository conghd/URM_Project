import React, {useState, useEffect, useLayoutEffect} from "react";
import {Text, View, StyleSheet, Pressable, SafeAreaView, FlatList}
  from "react-native";
import {Feather} from "@expo/vector-icons";
import MessagingListItem from "./MessagingListItem";
import {styles} from "./MessengerStyles";
import socket from "../../utils/socket";


const MessagingListScreen = ({navigation, route}) => {
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    console.log("Messenger::useEffect()");
  }, []);

  useLayoutEffect(() => {
  }, [navigation]);

  useEffect(() => {
    socket.on("roomList", (newRoomList) => {
      console.log("roomList: " + JSON.stringify(newRoomList));
      setRoomList(newRoomList);
    });
  }, [socket]);

  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chatlistContainer}>
        {roomList.length > 0 ? (
            <FlatList
              data={roomList}
              renderItem={({item}) => <MessagingListItem item={item} />}
              keyExtractor={(item) => item.id}
            />
        ) : (
            <View style={styles.chatemptyContainer}>
              <Text style={styles.chatemptyText}>No rooms created!</Text>
              <Text>Click the icon above to create a Chat room</Text>
            </View>
        )}
      </View>
    </SafeAreaView>
  );
};
/*
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

});
*/

export default MessagingListScreen;
