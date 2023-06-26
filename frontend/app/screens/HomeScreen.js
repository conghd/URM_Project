import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';
import { Appbar } from 'react-native-paper';

const HomeScreen = ({ navigation, route }) => {
  //const { setUserToken } = route.params;
  useEffect(() => {
    console.log("HomeScreen::useEffect()");
  }, []);



  return (
    <>
      <Appbar.Header >
        <Appbar.Content title="UR Marketplace" />
        <Appbar.Action icon="plus" onPress={() => {}} />
        <Appbar.Action icon="magnify" onPress={() => {navigation.navigate("Search")}} />
      </Appbar.Header>
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => { navigation.navigate('Details', {
          itemId: 85,
          otherParam: 'Anything Bla bla',
        }); }}
        />

        <Button title="Sign Out"
          //onPress={() => setUserToken(null) }
          />
    </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

});
export default HomeScreen;