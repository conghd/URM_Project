import React, {useState, useEffect, useLayoutEffect} from "react";
import {Text, View, StyleSheet, Pressable, SafeAreaView, FlatList}
  from "react-native";
import {Feather} from "@expo/vector-icons";
import ChatItem from "./ChatItem";
import {styles} from "./MessengerStyles";
import {rooms} from "./rooms";
import socket from "../../utils/socket";


const ChatScreen = ({navigation, route}) => {
  useEffect(() => {
    console.log("Messenger::useEffect()");
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable onPress={() => {
          socket.emit("createRoom", "Hoang Duc Cong's room");
        }}
        >
          <Feather name='edit' size={24} color='green' />
        </Pressable>
      ),
    });
  }, [navigation]);


  return (
    <SafeAreaView style={styles.chatscreen}>
      <View style={styles.chatlistContainer}>
        {rooms.length > 0 ? (
            <FlatList
              data={rooms}
              renderItem={({item}) => <ChatItem item={item} />}
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

export default ChatScreen;
