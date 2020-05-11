import React, { useState, useEffect } from "react";

import Icon from "react-native-vector-icons/FontAwesome";
import { BookCard } from "./card";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  // Dimensions,
  FlatList,
  Image,
  // Linking,
  // TouchableOpacity,
} from "react-native";
import * as firebase from "firebase";
import FirebaseKeys from "../config";
import { rewriteFavouriteList, saveFavouriteList } from "./utils";

var firebaseConfig = FirebaseKeys;

function search(props) {
  navigationOptions = { title: "Search" };
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [favouritesList, setFavouritesList] = useState([]);
  const [users, setUsers] = useState([]);

  const { currentUser } = firebase.auth();

  useEffect(() => {
    firebase
      .database()
      .ref(`users/${currentUser.uid}/favourites/`)
      .on("value", (snapshot) => {
        const data = snapshot.val() || {};
        const userList = Object.values(data);
        setUsers(userList);
      });
  }, []);

  // Save favourite items to the database
  const getResult = () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${input}+intitle:${input}&key=AIzaSyDypBp7rLq3boi2BR80pmO1AVziCFa5Lg8`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setResult(responseJson.items);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };
  const searchButton = (
    <Icon.Button name="search" backgroundColor="violet" onPress={getResult}>
      Search
    </Icon.Button>
  );

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%",
        }}
      />
    );
  };

  const { navigate } = props.navigation;
  return (
    <View style={styles.container}>
      {/* <View style={styles.favourites}>{favButton}</View> */}

      <TextInput
        style={{
          fontSize: 18,
          width: 250,
          textAlign: "center",
          marginTop: 60,
          borderColor: "violet",
          borderWidth: 2,
          height: 40,
        }}
        value={input}
        placeholder="Search"
        onChangeText={(input) => setInput(input)}
      />

      {searchButton}

      <FlatList
        style={{
          textAlign: "center",
          width: "90%",
          backgroundColor: "pink",
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <BookCard
              item={item}
              checked={favouritesList.includes(item)}
              onPress={() => {
                let checked = favouritesList.includes(item);

                const newFavoritesList = checked
                  ? favouritesList.filter((item2) => item2.id !== item.id)
                  : [...favouritesList, item];

                setFavouritesList(newFavoritesList);
                if (checked) {
                  rewriteFavouriteList(newFavoritesList);
                } else {
                  saveFavouriteList(item);
                }
              }}
            />
          </>
        )}
        ItemSeparatorComponent={listSeparator}
        data={result}
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
  favourites: {
    alignItems: "flex-end",
  },
});

search.navigationOptions = ({ navigate }) => ({ title: "Search" });

export default search;
