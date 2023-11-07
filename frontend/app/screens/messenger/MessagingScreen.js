import React, {useEffect, useLayoutEffect, useState} from "react";
import {View, TextInput, Text, FlatList, Pressable} from "react-native";
import moment from "moment";
import socket from "../../utils/socket";
import {styles} from "./MessengerStyles";
import MessagingItem from "./MessagingItem";

const MessagingScreen = ({route, navigation}) => {
  const [user, setUser] = useState("dhx496@uregina.ca");
  const {name, id} = route.params;

  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");

  const handleNewMessage = () => {
    if (user) {
      socket.emit("newMessage", {
        message,
        room_id: id,
        user,
        timestamp: moment().format("HH:mm"),
      });
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({title: name});
    // getUsername();
    socket.emit("findRoom", id);
    socket.on("foundRoom", (roomChats) => {
      console.log("foundRoom1");
      setChatMessages(roomChats);
    });
  }, []);

  /*
  useEffect(() => {
    socket.on("foundRoom", (roomChats) => {
      console.log("foundRoom2");
      setChatMessages(roomChats);
    });
  }, [socket]);

  */

  return (
    <View style={styles.messagingscreen}>
      <View
        style={[
          styles.messagingscreen,
          {paddingVertical: 15, paddingHorizontal: 10},
        ]}
      >
        {chatMessages[0] ? (
        <FlatList
          data={chatMessages}
          renderItem={({item}) => (
            <MessagingItem item={item} user={user} />
          )}
          keyExtractor={(item) => item.id}
        />
        ) : (
          ""
        )}
      </View>

      <View style={styles.messaginginputContainer}>
        <TextInput
          style={styles.messaginginput}
          onChangeText={(value) => setMessage(value)}
        />
        <Pressable
          style={styles.messagingbuttonContainer}
          onPress={handleNewMessage}
        >
          <View>
            <Text style={{color: "#f2f0f1", fontSize: 20}}>SEND</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default MessagingScreen;
