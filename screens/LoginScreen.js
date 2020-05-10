import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
  ImageBackground,
} from "react-native";
import * as firebase from "firebase";

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    email: "",
    password: "",
    errorMessage: null,
  };

  handleLogin = () => {
    const { email, password } = this.state;

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.setState({ errorMessage: error.message }));
  };

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <ImageBackground
          source={require("../assets/sign.png")}
          style={styles.backgroundImage}
        >
          <Text style={styles.greeting}>Welcome back!</Text>

          <View style={styles.errorMessage}>
            {this.state.errorMessage && (
              <Text style={styles.error}>{this.state.errorMessage}</Text>
            )}
          </View>

          <View style={styles.form}>
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

          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => this.props.navigation.navigate("Register")}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              I don't have account yet.{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  color: "hotpink",
                  fontSize: 20,
                  margin: 10,
                }}
              >
                {" "}
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => this.props.navigation.navigate("ForgotPassword")}
          >
            <Text style={{ color: "white", fontSize: 20 }}>
              I forgot password{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  color: "hotpink",
                  fontSize: 20,
                  margin: 10,
                }}
              >
                {" "}
                Need help
              </Text>
            </Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting: {
    // marginTop: 5,
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
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
    // width: "80%",
    // backgroundColor: "white",
  },
  inputTitle: {
    color: "white",
    fontSize: 20,
    textTransform: "uppercase",
    margin: 10,
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
    color: "white",
  },
  button: {
    margin: 10,
    marginHorizontal: 30,
    backgroundColor: "violet",
    borderRadius: 4,
    height: 50,
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
