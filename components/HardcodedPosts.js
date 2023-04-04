import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import PostComponent from "./PostComponent";
import axios from "axios";
import Ip from "../IP";

const Post = ({ image, first_name, last_name, text, photo, time }) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image source={image} style={styles.profileImage} />
        <View>
          <Text style={styles.username}>
            {first_name} {last_name}
          </Text>
          <Text style={styles.postTime}>{time}</Text>
        </View>
      </View>
      <Text style={styles.postText}>{text}</Text>
      {photo && <Image source={photo} style={styles.postPhoto} />}
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="thumbs-up" size={20} color="#333" />
          <Text style={styles.actionButtonText}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="message-circle" size={20} color="#333" />
          <Text style={styles.actionButtonText}>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Feather name="repeat" size={20} color="#333" />
          <Text style={styles.actionButtonText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HardcodedPosts = ({ navigation }) => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    getPost();
  }, []);

  const getPost = () => {
    axios
      .get(`${Ip}/api/post/getPost`)
      .then((result) => {
        setPosts(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}
    >
      <PostComponent />

      {posts &&
        posts.map((element, index) =>
          element.attachment ? (
            <Post
              image={{ uri: element.image }}
              first_name={element.first_name}
              last_name={element.last_name}
              text={element.content}
              photo={{ uri: element.attachment }}
              time="4 hours ago"
              key={index}
            />
          ) : (
            <Post
              image={{ uri: element.image }}
              first_name={element.first_name}
              last_name={element.last_name}
              text={element.content}
              time="4 hours ago"
              key={index}
            />
          )
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  postContainer: {
    backgroundColor: "#FFF",
    padding: 10,
    marginBottom: 2, // Changed from 20 to 10
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    paddingLeft:30,
    paddingRight:30,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
  },
  postTime: {
    fontSize: 12,
    color: "#999",
    marginLeft: 8,
  },
  postText: {
    fontSize: 17,
    marginTop: 10,
    marginBottom: 7,
  },
  postPhoto: {
    width: "110%",
    right: 22,
    height: 470,
    borderRadius: 5,
    marginTop: 1,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#CCC",
    flexDirection: "row", // added flexDirection
    alignItems: "center", // added alignItems
    marginHorizontal: 6, // added marginHorizontal
  },
  actionButtonText: {
    color: "#333",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 5, // added marginLeft
  },
  actionButtonIcon: {
    marginRight: 5, // added marginRight
  },
});

export default HardcodedPosts;
