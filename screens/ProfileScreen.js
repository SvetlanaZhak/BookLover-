import React from "react";
import { View, Text, StyleSheet } from "react-native";
import * as firebase from "firebase";
import FirebaseKeys from "../config";

var firebaseConfig = FirebaseKeys;

export default class ProfileScreen extends React.Component {
  state = {
    email: "",
    password: "",
    displayName: "",
  };
  // FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
  componentDidMount() {
    const { currentUser } = firebase.auth();
    const { email, displayName, password } = firebase.auth().currentUser;

    console.log("AA", currentUser.password);
    this.setState({ email, displayName, password });
    console.log("dispname", firebase.auth().currentUser);
  }
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontWeight: "bold",
            // marginTop: "15%",
            // marginBottom: "80%",
            color: "violet",
            fontSize: 20,
          }}
        >
          My Profile
          {"\n"}
        </Text>
        {/* <View>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            My email: {this.state.email}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {" "}
            My name: {this.state.displayName}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            {" "}
            My password: {this.state.password}
          </Text>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
});
