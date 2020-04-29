import React from "react";
import { StyleSheet, Button, Text, View, FlatList } from "react-native";
import { StackNavigator } from "react-navigation";
import { BookCard } from "./card";

function favourites(props) {
  navigationOptions = { title: "Favourites" };
  // const { favouritesList } = props.navigation.state.params;
  const favouritesList = [];

  console.log(favouritesList);
  console.log("sadfsdafsd");

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: "bold",
          marginTop: "5%",
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
