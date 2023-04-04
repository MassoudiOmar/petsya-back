import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AwesomeAlert from "react-native-awesome-alerts";

const backgroundImage = require("../assets/icon.png");

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const handleLogin = () => {
    const data = {
      email: email,
      password: password,
    };
    axios
      .post(`${Ip}/api/users/login`, data)
      .then((result) => {
        result.data.message == "login succssefull"
          ? handleSuccess(result.data.message, result.data.UsertokenInfo)
          : handleFailed(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSuccess = (message, token) => {
    setMessage(message);
    setAlert(true); // set Alert to true to show the error message
    token ? AsyncStorage.setItem("UsertokenInfo", token) : null;
    navigation.navigate("Main");
    setTimeout(() => {
      setAlert(false); // set Alert to false to hide the error message
    }, 2000);  };
  const handleFailed = (message) => {
    setMessage(message);
    setAlert(true); // set Alert to true to show the error message
    setTimeout(() => {
      setAlert(false); // set Alert to false to hide the error message
    }, 2000);
  };
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.createAccountText}>
            Don't have an account? Create one
          </Text>
        </TouchableOpacity>
      </View>
      <AwesomeAlert
        show={Alert}
        showProgress={false}
        message={message}
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
  title: {
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

export default Login;
