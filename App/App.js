import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    // Faça algo com o texto inserido
    setMessages([...messages,inputText])
    console.log("-----------------------");
    messages.map((message, index) =>
      console.log(messages.length + " " + message + " " + index)
    );
  };

  return (
    <View style={styles.inputContainerOut}>
      {/* Mensagens */}
      <View style={styles.messageContainer}>
        {messages.map((message, index) => (
          <Text key={index} style={styles.message}>
            {message}
          </Text>
        ))}
      </View>

      {/* Enviar e escrever mensagem */}
      <View style={styles.inputContainerIn}>
        <TextInput
          style={styles.textInput}
          placeholder="Digite aqui"
          onChangeText={handleInputChange}
          value={inputText}
        />
        <Pressable
          style={styles.sendButton}
          title="Enviar"
          onPress={handleButtonPress}
        >
          <Text>Enviar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainerOut: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "beige",
  },

  inputContainerIn: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    height: "5vh",
  },

  messageContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },

  message: {
    textAlign: "center",

  },

  textInput: {
    width: "70%",
    borderColor: "gray",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderWidth: 1,
    textAlign: "left",
    paddingLeft: 10,
    fontSize: "18px",
  },

  sendButton: {
    width: "25%",
    backgroundColor: "darkolivegreen",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },
});
