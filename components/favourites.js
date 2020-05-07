import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { BookCard } from "./card";
import * as firebase from "firebase";
import FirebaseKeys from "../config";

var firebaseConfig = FirebaseKeys;

function favourites(props) {
  navigationOptions = { title: "Favourites" };
  // const { favouritesList } = props.navigation.state.params;
  // const favouritesList = [];
  const [favouritesList, setFavouritesList] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("users/")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const prods = Object.values(data);
        console.log("PRODS", prods.length);
        console.log("AAA", prods);
        if (prods.length) {
          setFavouritesList(prods[prods.length - 1].favouritesList);
          console.log(prods[prods.length - 1].favouritesList);
        }
      });
  }, []);

  console.log("MOMOI", favouritesList);
  console.log("MOMOI", typeof favouritesList);
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          marginTop: "15%",
          color: "violet",
          fontSize: 20,
        }}
      >
        Favourites
        {"\n"}
      </Text>

      <FlatList
        data={favouritesList}
        renderItem={({ item }) => (
          <BookCard
            item={item}
            // checked={favouritesList.includes(item)}
            // onPress={() => {
            //   const checked = favouritesList.includes(item);
            //   const newFavoritesList = checked
            //     ? favouritesList.filter((item2) => item2.id !== item.id)
            //     : [...favouritesList, item];
            //   setFavouritesList(newFavoritesList);
            //   saveFavouriteList(newFavoritesList);
            // }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
// favourites.navigationOptions = ({ navigate }) => ({ title: "Favourites" });

export default favourites;
