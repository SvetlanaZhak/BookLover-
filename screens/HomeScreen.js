import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as firebase from "firebase";
import Icon from "react-native-vector-icons/FontAwesome";

export default class HomeScreen extends React.Component {
  state = {
    email: "",
    displayName: "",
  };

  componentDidMount() {
    // const { currentUser } = firebase.auth();
    const { email, displayName } = firebase.auth().currentUser;
    this.setState({ email, displayName });
  }

  signOutUser = () => {
    firebase.auth().signOut();
  };

  // firebase.auth().currentUser
  render() {
    //   console.log(displayName);

    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 32 }}>
          Hi {this.state.displayName}!
        </Text>
        {/* <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}> */}
        <Icon.Button
          name="sign-out"
          backgroundColor="violet"
          onPress={this.signOutUser}
        >
          Logout
        </Icon.Button>
        {/* </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
});
