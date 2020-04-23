import React, { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, CheckBox } from "react-native-elements";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
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

export function BookCard({ item, checked, onPress }) {
  return (
    <Card
      key={item.id}
      title={item.volumeInfo.title}
      style={{ backgroundColor: "pink" }}
    >
      <View
        key={item.id}
        style={{
          display: "flex",
          flexDirection: "raw",
          justifyContent: "space-between",
          // flexWrap: "nowrap",
        }}
      >
        <Image
          style={{
            display: "flex",
            width: 100,
            height: 150,
            margin: 5,
            alignSelf: "flex-start",
            flexGrow: 2,
          }}
          resizeMode="cover"
          source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
        />
        <Text
          style={{
            display: "flex",
            alignSelf: "flex-end",
            flexGrow: 1,
            fontSize: 7,
          }}
        >
          by {item.volumeInfo.authors}
        </Text>
        <CheckBox
          style={{ paddingBottom: 20 }}
          right
          checkedIcon="heart"
          uncheckedIcon="heart-o"
          checkedColor="violet"
          uncheckedColor="violet"
          checked={checked}
          onPress={onPress}
        />
        {/* <TouchableOpacity
                  onPress={() => Linking.openURL("http://google.com")}
                >
                  <Text style={{ color: "blue" }}>Google</Text>
                </TouchableOpacity> */}
      </View>
    </Card>
  );
}
