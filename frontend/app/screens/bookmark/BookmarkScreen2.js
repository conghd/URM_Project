import React, {useState, useEffect, useRef} from "react";
import {Text, View, StyleSheet, SafeAreaView,
  TouchableOpacity,
  ScrollView} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome";
import MDIcon from "react-native-vector-icons/MaterialIcons";

import {Button, Divider} from "react-native-paper";
import {useActionSheet} from "@expo/react-native-action-sheet";
import RBSheet from "react-native-raw-bottom-sheet";
import {theme} from "../../constants";
import data from "./static.json";

FAIcon.loadFont();
MDIcon.loadFont();

const BookmarkScreen2 = () => {
  const {showActionSheetWithOptions} = useActionSheet();
  const refRBSheet = useRef();

  useEffect(() => {
    console.log("BookmarkScreen::useEffect()");
  }, []);

  const handlePress = () => {
    const title = "Choose an action";
    const message = "Alternatively, any component can use the higher order component to access the context and pass the showActionSheetWithOptions as a prop.";
    const options = ["Delete", "Save", "Cancel"];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 0;

    showActionSheetWithOptions({
      title,
      message,
      options,
      cancelButtonIndex,
      destructiveButtonIndex,
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 1:
          // Save
          break;

        case destructiveButtonIndex:
          // Delete
          break;

        case cancelButtonIndex:
          // Canceled
      }
    });
  };

  const handleBottomSheet = () => {
    refRBSheet.current.open();
  };
  return (
    <SafeAreaView style={theme.STYLE.container}>
      <View style={[theme.STYLE.row, styles.row]}>
        <Button style={styles.button}
          mode="contained" onPress={handlePress}>Open Action Sheet</Button>
      </View>
      <View style={[theme.STYLE.row, styles.row]}>
        <Button style={styles.button}
          mode="contained" onPress={handleBottomSheet}>Open Raw Bottom Sheet</Button>
      </View>

      <View style={[theme.STYLE.row, styles.row]}>
        <RBSheet
          height={350}
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              // backgroundColor: "#fff",
            },
            draggableIcon: {
              backgroundColor: "#000",
            },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}
        >
          <View style={styles.listContainer}>
            <Text style={styles.listTitle}>Create</Text>
            <Divider />
            <ScrollView>
              {data.lists.map((list) => (
                <TouchableOpacity
                  key={list.icon}
                  style={styles.listButton}
                  onPress={() => {
                    refRBSheet.current.close();
                  }}
                >
                  <MDIcon name={list.icon} style={styles.listIcon} />
                  <Text style={styles.listLabel}>{list.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </RBSheet>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#ffffff",
    backgroundColor: "#F5FCFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  row: {
    marginTop: 5,
  },
  textTitle: {
    fontSize: 20,
    marginTop: 120,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    width: 150,
    backgroundColor: "#4EB151",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 3,
    margin: 10,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    flex: 1,
    padding: 25,
    paddingTop: 5,
  },
  listTitle: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
    fontStyle: "normal",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  listButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  listIcon: {
    fontSize: 26,
    color: "#666",
    width: 60,
  },
  listLabel: {
    fontSize: 16,
  },

});

export default BookmarkScreen2;
