import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ip from "../IP";
import AwesomeAlert from "react-native-awesome-alerts";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();
  const backgroundImage = require("../assets/icon.png");

  const handleSignup = () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    axios
      .post(`${Ip}/api/users/registration`, data)
      .then((result) => {
        result.data == "registration success"
          ? handleSuccess(result.data)
          : handleFailed(result.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSuccess = (message) => {
    setMessage(message);
    setAlert(true);
    navigation.navigate("Login");
    setTimeout(() => {
      setAlert(false); // set Alert to false to hide the error message
    }, 2000);
  };
  const handleFailed = (message) => {
    console.log("n");

    setMessage(message);
    setAlert(true);
    setTimeout(() => {
      setAlert(false); // set Alert to false to hide the error message
    }, 2000);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.header}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor={"white"}
          placeholder="First Name"
          onChangeText={(text) => setFirstName(text)}
          value={firstName}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={"white"}
          placeholder="Last Name"
          onChangeText={(text) => setLastName(text)}
          value={lastName}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={"white"}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholderTextColor={"white"}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Resiter</Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={Alert}
        message={message}
        showProgress={false}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={false}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
  },
  createAccountText: {
    marginTop: 20,
    color: "white",
    textDecorationLine: "underline",
  },
});

export default Signup;
