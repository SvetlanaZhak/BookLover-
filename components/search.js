import React, { useState } from "react";
// import {
//   Card,
//   CardTitle,
//   CardContent,
//   CardAction,
//   CardButton,
//   CardImage,
// } from "react-native-cards";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, CheckBox } from "react-native-elements";
// import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
// import { faHeart } from "@fortawesome/free-solid-svg-icons";
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

function search(props) {
  navigationOptions = { title: "Search" };
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [favouritesList, setFavouritesList] = useState([]);

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

  const favButton = (
    <Icon.Button
      name="heart"
      backgroundColor="violet"
      onPress={() => navigate("Favourites", { favouritesList })}
    >
      Favourites
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
      <View style={styles.favourites}>{favButton}</View>

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
          width: "80%",
          backgroundColor: "pink",
        }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            {/* <Card
              title={item.volumeInfo.title}
              containerStyle={{
                padding: 10,
                height: 300,
                paddingTop: 10,
                width: "60%",
              }}
              key={item.id}
              style={{ position: "absolute" }}
              // resizeMode="cover"
              image={{
                uri: item.volumeInfo.imageLinks.smallThumbnail,
              }}
            >
              <Text style={{ textAlign: "center", paddingTop: 5, fontSize: 7 }}>
                by {item.volumeInfo.authors}
              </Text>
            </Card> */}
            <BookCard
              item={item}
              checked={favouritesList.includes(item)}
              onPress={() => {
                const checked = favouritesList.includes(item);
                if (checked) {
                  setFavouritesList(
                    favouritesList.filter((item2) => item2.id !== item.id)
                  );
                } else {
                  setFavouritesList([...favouritesList, item]);
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