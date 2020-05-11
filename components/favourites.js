import React, { useState, useEffect } from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { BookCard } from "./card";
import * as firebase from "firebase";
import FirebaseKeys from "../config";
import { rewriteFavouriteList } from "./utils";

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
        const data = snapshot.val() || {};
        const prods = Object.values(data);
        if (prods.length != 0) {
          setFavouritesList(prods);
        }
      });
  }, []);

  // Delete favourite items from the database
  // const deleteFavouriteItem = (newFavoritesItem) => {
  //   const { currentUser } = firebase.auth();
  //   console.log("TAM", currentUser);
  //   firebase
  //     .database()
  //     .ref(`users/${currentUser.uid}/favourites/`)
  //     .delete();
  // };
  // deleteFavouriteItem = () => {
  //   const { currentUser } = firebase.auth();
  //   firebase
  //     .doc(`users/${currentUser.uid}/favourites/${newFavoritesList}`)
  //     .delete()
  //     .then(function () {
  //       console.log("Document successfully deleted!");
  //     })
  //     .catch(function (error) {
  //       console.error("Error removing document: ", error);
  //     });
  // };
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
          width: "90%",
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
              console.log(newFavoritesList);
              rewriteFavouriteList(newFavoritesList);
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
