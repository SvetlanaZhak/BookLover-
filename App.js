import React, { useState } from "react";
// import { GoogleBookSearch } from "react-native-google-books";
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
          width: 200,
          textAlign: "center",
          marginTop: 60,
          borderColor: "blue",
          borderWidth: 2,
        }}
        value={input}
        placeholder="Search"
        onChangeText={(input) => setInput(input)}
      />
      <Button title="Find" onPress={getResult} />
      <FlatList
        style={{ marginLeft: "5%" }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Title: {item.volumeInfo.title}</Text>
            <Text>Author: {item.volumeInfo.authors}</Text>
            <Image
              style={{ width: 100, height: 100, margin: 10 }}
              source={{ uri: item.volumeInfo.imageLinks.smallThumbnail }}
            />
          </View>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
