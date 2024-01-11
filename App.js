import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import VisionTester from './components/Screens/VisionTester';
import HomeScreen from './components/Screens/HomeScreen';
import Modal from './components/Displays/Modal';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute  } from '@react-navigation/native';
import colours from './colours';
import { ThemedButton } from "react-native-really-awesome-button";
import HowToPlay from './components/Screens/HowToPlay';
import GalleryScreen from './components/Screens/GalleryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavBar() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      headerStyle : {
        backgroundColor : colours.primaryColour,
        height : "6%",
      },
      tabBarStyle : {
        display: getTabBarVisibility(route) ? 'none' : 'flex',
      }
    })}
    >
      <Tab.Screen name="Home" component={StackNav} />
  
    </Tab.Navigator>
  )
}

const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  return ['VisionTester', 'HowToPlay'].includes(routeName);
}

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false}} name='HomeTab' component={HomeScreen}/>
      <Stack.Screen options={{ headerShown: false}} name='VisionTester' component={VisionTester}/>
      <Stack.Screen options={{ headerShown: false}} name='HowToPlay' component={HowToPlay}/>
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>
      <TabNavBar />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {},
});
