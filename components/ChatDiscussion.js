import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Ip from "../IP";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatDiscussion = ({ route }) => {
  const reciever_id = route.params;
  const [message, setMessage] = useState("");
  const [Discussion, setDiscussion] = useState("");
  const [userId, setUserId] = useState("");
console.log(userId,'ee')
  useEffect(() => {
    makeConversation();
  }, []);

  const makeConversation = async () => {
    const token = await AsyncStorage.getItem("UsertokenInfo");
    try {
      const response = await axios.get(`${Ip}/api/users/userInfo`, {
        headers: { token: token },
      });
      setUserId(response.data.user.id);
      axios
        .post(
          `${Ip}/api/chat/makeConversation/${response.data.user.id}/${reciever_id}`
        )
        .then(async (result) => {
          axios
            .get(`${Ip}/api/chat/getMessage/${result.data[0].convertSation_id}`)
            .then(async (result) => {
              setDiscussion(result.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error, "lol");
    }
  };

  const handleSend = async () => {
    axios
      .post(`${Ip}/api/chat/makeConversation/${userId}/${reciever_id}`)
      .then((result) => {
        const data = {
          sender_id: userId,
          reciever_id: reciever_id,
          message: message,
          convertSation_id: result.data[0].convertSation_id,
        };
        axios
          .post(`${Ip}/api/chat/sendMessage`, data)
          .then((result) => {
            refreshdata();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const refreshdata = () => {
    setMessage("");
    makeConversation();
  };

  const renderMessage = ({ item, index }) => {
    if (Discussion.length == 1 || Discussion.length == 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No messages</Text>
        </View>
      );
    } else {
      // check if index is the last index
      if (index === Discussion.length - 1) {
        return null;
      }

      const align = item.sender_id !== userId ? "flex-start" : "flex-end";
      return (
        <View
          key={item.message_id}
          style={[styles.messageContainer, { alignSelf: align }]}
        >
          <View style={styles.messageBubble}>
            {item.message && item.message.trim() !== "" && (
              <Text style={styles.messageText}>{item.message}</Text>
            )}
          </View>
          <Image style={styles.userImage} source={{ uri: item.image }} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Discussion}
        renderItem={renderMessage}
        keyExtractor={(item) => item.message_id}
        contentContainerStyle={styles.messagesContainer}
        inverted // to display messages from bottom to top
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  messagesContainer: {
    flexGrow: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  messageBubble: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  userImage: {
    width: 20,
    height: 20,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    marginRight: 8,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 16,
    fontSize: 16,
  },
  sendButton: {
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007aff",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  timestamp: {
    color: "#999",
    fontSize: 12,
    marginLeft: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "gray",
  },
});

export default ChatDiscussion;
