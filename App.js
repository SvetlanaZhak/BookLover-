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
import { Card } from "react-native-elements";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  Button,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const getResult = () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=${input}+inauthor:keyes&key=AIzaSyDypBp7rLq3boi2BR80pmO1AVziCFa5Lg8`;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setResult(responseJson.items);
      })
      .catch((error) => {
        Alert.alert("Error", error);
      });
  };
  const myButton = (
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

  return (
    <View style={styles.container}>
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
      {/* <Button title="Find" onPress={getResult} /> */}
      {myButton}
      <FlatList
        style={{ textAlign: "center", width: "80%" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            containerStyle={{ padding: 10, height: 350 }}
            key={item.id}
            title={item.volumeInfo.title}
            style={styles.image}
            resizeMode="cover"
            image={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
          >
            <Text style={{ textAlign: "center", padding: 10, marginTop: 10 }}>
              by {item.volumeInfo.authors}
            </Text>
          </Card>
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
});
