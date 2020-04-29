import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

import favourites from "./components/favourites";
import search from "./components/search";

import * as firebase from "firebase";

import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";

var firebaseConfig = {
  apiKey: "AIzaSyDypBp7rLq3boi2BR80pmO1AVziCFa5Lg8",
  authDomain: "booklover-274814.firebaseapp.com",
  databaseURL: "https://booklover-274814.firebaseio.com",
  projectId: "booklover-274814",
  storageBucket: "booklover-274814.appspot.com",
  messagingSenderId: "696602087646",
  measurementId: "G-1GR67KTR3Q",
  appId: "1:696602087646:web:f3d3e5b5d9cf02411cb24f",
};
//Initialize firebase

firebase.initializeApp(firebaseConfig);

const AppTabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-home" size={24} color={tintColor} />
        ),
      },
    },
    Search: {
      screen: search,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-search" size={24} color={tintColor} />
        ),
      },
    },

    Favourites: {
      screen: favourites,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-heart" size={24} color={tintColor} />
        ),
      },
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-person" size={24} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: "violet",
      inactiveTintColor: "pink",
      showLabel: false,
    },
  }
);

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: "Loading",
    }
  )
);
