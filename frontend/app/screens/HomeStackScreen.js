import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import { Button } from "react-native";
import { IconButton } from "react-native-paper";

const HomeStack = createNativeStackNavigator();
function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            //tabBarLabel: 'Home',
            /*
            headerTitle: "BLA",
            headerSearchBarOptions: {
                placeholder: "Search",
            },
        
          headerRight: () => (
            <IconButton
                icon="plus"
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#ffff00"
            />
          ),
          */
        }}
        />
      </HomeStack.Navigator>
    );
}

export default HomeStackScreen;