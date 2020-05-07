import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, CheckBox } from "react-native-elements";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
import * as WebBrowser from "expo-web-browser";
import { Linking } from "expo";
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
  //   Linking,
  TouchableOpacity,
} from "react-native";

export function BookCard({ item, checked, onPress }) {
  console.log("NNOOOO", item);
  return (
    <Card key={item.id} title={item.volumeInfo.title} style={{}}>
      <View key={item.id} style={styles.container}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
        />
        <Text style={styles.authors}>by {item.volumeInfo.authors}</Text>
        <CheckBox
          style={{ paddingTop: 20 }}
          right
          size={30}
          checkedIcon="heart"
          uncheckedIcon="heart-o"
          checkedColor="violet"
          uncheckedColor="violet"
          checked={checked}
          onPress={onPress}
        />
        <View>
          {item.saleInfo.buyLink ? (
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                console.log(item.saleInfo.buyLink);
                WebBrowser.openBrowserAsync(item.saleInfo.buyLink);
              }}
            >
              <Text style={styles.btnText}>Buy</Text>
            </TouchableOpacity>
          ) : (
            <Text>" "</Text>
          )}
        </View>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  image: {
    display: "flex",
    width: 100,
    height: 300,
    margin: 5,
    alignSelf: "flex-start",
    flexGrow: 2,
  },
  authors: {
    display: "flex",
    width: 90,
    // height: 150,
    margin: 5,
    alignSelf: "flex-start",
    flexGrow: 2,
    fontSize: 9,
    marginRight: 10,
    fontWeight: "bold",
  },
  checkbox: {
    display: "flex",
    paddingTop: 200,
  },
  btnStyle: {
    backgroundColor: "violet",
    color: "white",
    // flex: 1 / 5,
    borderRadius: 5,
    textAlign: "center",
    alignContent: "center",
    padding: 10,
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 10,
  },
});
