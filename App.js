
/**
 * @file App.js
 * @description Main entry point of the application.
 * @module App
 */

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './components/Screens/MainScreen';
import HomeScreen from './components/Screens/HomeScreen';
import Modal from './components/Displays/Modal';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, getFocusedRouteNameFromRoute  } from '@react-navigation/native';
import colours from './colours';
import { ThemedButton } from "react-native-really-awesome-button";
import HowToPlay from './components/Screens/HowToPlay';
import GalleryScreen from './components/Screens/GalleryScreen';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'
import LeaderBoardScreen from './components/Screens/LeaderBoardScreen';

/**
 * Creates a bottom tab navigator for the application.
 * @returns {JSX.Element} The bottom tab navigator component.
 */
const Tab = createBottomTabNavigator();

/**
 * Creates a stack navigator for the application.
 * @returns {JSX.Element} The stack navigator component.
 */
const Stack = createStackNavigator();

/**
 * Determines the visibility of the tab bar based on the current route.
 * @param {Object} route - The current route object.
 * @returns {boolean} True if the tab bar should be visible, false otherwise.
 */
const getTabBarVisibility = (route) => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  return ['MainScreen', 'HowToPlay'].includes(routeName);
}

/**
 * Renders the stack navigator component.
 * @returns {JSX.Element} The stack navigator component.
 */
function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false}} name='HomeTab' component={HomeScreen}/>
      <Stack.Screen options={{ headerShown: false}} name='MainScreen' component={MainScreen}/>
      <Stack.Screen options={{ headerShown: false}} name='HowToPlay' component={HowToPlay}/>
      <Stack.Screen name="GalleryScreen" component={GalleryScreen} />
    </Stack.Navigator>
  );
}

/**
 * Renders the bottom tab navigator component.
 * @returns {JSX.Element} The bottom tab navigator component.
 */
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
      <Tab.Screen name="Home" component={StackNav}

       options={{
            tabBarIcon: ({color , size}) => (
              <Entypo name="home" size={24} color={colours.accentColour} />
            ),
          }}
       />

        <Tab.Screen name="LeaderBoard" component={LeaderBoardScreen}

        options={{
            tabBarIcon: ({color , size}) => (
              <MaterialIcons name="leaderboard" size={24} color={colours.accentColour} />
            ),
          }}
        />
  
    </Tab.Navigator>
  )
}

/**
 * The main entry point of the application.
 * @returns {JSX.Element} The root component of the application.
 */
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
