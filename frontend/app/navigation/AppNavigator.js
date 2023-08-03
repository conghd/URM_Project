import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import MainScreen from "../screens/listing/MainScreen";
import DetailsScreen from "../screens/listing/DetailsScreen";
import SearchScreen from "../screens/listing/SearchScreen";
import ProductCreationScreen from "../screens/listing/CreationScreen";

const Stack = createStackNavigator();
const options1 = {
  headerShown:false,
  ...TransitionPresets.DefaultTransition
}
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainScreen}
        options={{
        //title: "UR Marketplace",
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#004e2e' },
        ...options1,
        }} 
        />
    <Stack.Screen name="Details" component={DetailsScreen} />
    <Stack.Screen name="Search" component={SearchScreen} />
    <Stack.Screen name="ProductCreation" component={ProductCreationScreen}
        options={{
        headerTitle: "New Listing"
        }
        } />
  </Stack.Navigator>
);

export default AppNavigator;
