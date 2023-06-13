
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { useEffect } from 'react';

const DetailsScreen = ({ navigation, route }) => {
  const {itemId, otherParam } = route.params;
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>itemId: {JSON.stringify(itemId) }</Text>
      <Text>otherParam: {JSON.stringify(otherParam) }</Text>
      <Button
        title="Go to Home"
        onPress={() => { navigation.navigate('Home'); }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

});
export default DetailsScreen;