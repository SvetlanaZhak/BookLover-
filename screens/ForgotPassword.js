import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Alert,
  Button,
} from "react-native";
import * as firebase from "firebase";

export default class ForgotPassword extends React.Component {
  state = {
    email: "",
  };

  onResetPasswordPress = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(this.state.email)
      .then(
        () => {
          Alert.alert("Password reset email has been sent.");
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };
  render() {
    return (
      <View
        // style={{
        //   paddingTop: 50,
        //   alignItems: "center",
        //   backgroundColor: "pink",
        // }}
        style={styles.container}
      >
        <Text
          style={{
            fontWeight: "bold",
            // marginTop: "15%",
            marginBottom: 20,
            fontSize: 20,
            color: "white",
          }}
        >
          I forgot Password
        </Text>

        <TextInput
          style={{
            width: 200,
            height: 40,
            borderWidth: 1,
            textAlign: "center",
          }}
          value={this.state.email}
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* <Button title="Reset Password" onPress={this.onResetPasswordPress} /> */}
        <TouchableOpacity
          style={styles.button}
          onPress={this.onResetPasswordPress}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Reset Password
          </Text>
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
    backgroundColor: "pink",
  },
  button: {
    margin: 20,

    marginHorizontal: 30,
    backgroundColor: "violet",
    borderRadius: 6,
    height: 50,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
  },
});
