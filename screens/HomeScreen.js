import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";

export default class HomeScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    // const { currentUser } = firebase.auth();
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
    console.log("dispname", firebase.auth().currentUser);
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  // firebase.auth().currentUser
  render() {
    //   console.log(displayName);

    return (
      <View style={styles.container}>
        <Text>Hi {this.state.displayName}!</Text>
        <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
