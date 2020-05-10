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
} from "react-native";
import * as firebase from "firebase";

export default class RegisterScreen extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null,
  };

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)

      .then((userCredentials) => {
        return userCredentials.user.updateProfile({
          displayName: this.state.name,
        });
      })
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    // console.log(displayName);
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/signup.jpg")}
          style={styles.backgroundImage}
        >
          {/* <StatusBar barStyle="light-content"></StatusBar> */}
          <TouchableOpacity
            color="violet"
            onPress={() => this.props.navigation.goBack()}
          >
            {/* <Ionicons name="ios-backspace" size={32} color="pink"></Ionicons> */}
          </TouchableOpacity>

          <Text style={styles.greeting}>Sign Up</Text>
          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
            <View>
              <Text style={styles.inputTitle}>Full Name</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
              ></TextInput>
            </View>

            <View>
              <Text style={styles.inputTitle}>Email Address</Text>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
              ></TextInput>
            </View>

            <View>
              <Text style={styles.inputTitle}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
              ></TextInput>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
  },
  greeting: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "violet",
  },
  errorMessage: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
  },
  error: {
    color: "red",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  form: {
    marginBottom: 40,
    marginHorizontal: 30,
    // margin: 100,
  },
  inputTitle: {
    color: "violet",
    fontSize: 20,
    textTransform: "uppercase",
    // margin: 10,
    fontWeight: "bold",
  },
  input: {
    borderBottomColor: "black",
    // borderWidth: 1,
    borderBottomWidth: 3,
    height: 40,
    fontSize: 15,
    // backgroundColor: "white",
    margin: 10,
    color: "violet",
  },
  button: {
    margin: 10,
    marginHorizontal: 30,
    backgroundColor: "violet",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
  },

  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
});
