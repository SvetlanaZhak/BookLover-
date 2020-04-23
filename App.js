import React from "react";
import Search from "./components/search.js";
import Favourites from "./components/favourites.js";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

export default function App() {
  const AppNavigator = createStackNavigator({
    Search: { screen: Search },
    Favourites: { screen: Favourites },
  });

  const AppContainer = createAppContainer(AppNavigator);

  return <AppContainer />;
}
