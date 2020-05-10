import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { BookCard } from "./card";
import * as firebase from "firebase";
import FirebaseKeys from "../config";

var firebaseConfig = FirebaseKeys;

function favourites(props) {
  navigationOptions = { title: "Favourites" };

  const [favouritesList, setFavouritesList] = useState([]);

  useEffect(() => {
    const { currentUser } = firebase.auth();

    firebase
      .database()
      .ref(`users/${currentUser.uid}/favourites/`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        const prods = Object.values(data);
        console.log("PRODS", prods.length);
        console.log("AAA", prods);
        if (prods.length != 0) {
          setFavouritesList(prods);
        }
      });
  }, []);

  // Delete favourite items from the database
  const deleteFavouriteItem = (newFavoritesItem) => {
    console.log("TAM", currentUser);
    firebase
      .database()
      .ref(`users/${currentUser.uid}/favourites/`)
      .delete(newFavoritesItem);
  };

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
        style={{
          textAlign: "center",
          width: "80%",
          backgroundColor: "pink",
        }}
        data={favouritesList}
        renderItem={({ item }) => (
          <BookCard
            item={item}
            checked={favouritesList.includes(item)}
            onPress={() => {
              let checked = favouritesList.includes(item);

              const newFavoritesList = checked
                ? favouritesList.filter((item2) => item2.id !== item.id)
                : [...favouritesList, item];

              setFavouritesList(newFavoritesList);
              deleteFavouriteItem(newFavoritesList);
            }}
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

export default favourites;
