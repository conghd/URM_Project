import {createNativeStackNavigator} from "@react-navigation/native-stack";
import BookmarkScreen from "./listing/BookmarkScreen";

// const Stack = createStackNavigator();
const Stack = createNativeStackNavigator();
const BookmarkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Bookmark" component={BookmarkScreen}
        options={{
          title: "Bookmark",
          headerShown: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default BookmarkStack;
