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

// import WebSocket from 'react-native-websocket';

import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const senderRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    let id = prompt('Please input your user name');
    const loadData = async () => {
      let res = await fetch(`http://localhost:8080/negotiate?id=${id}`);
      let data = await res.json();
      let ws = new WebSocket(data.url);
      ws.onopen = () => {
        console.log('connected');
      }
      console.log(senderRef.current);
      senderRef.current.addEventListener('click', e => {
        console.log("CLICKED");
        console.log(inputRef.current.value);
        if(inputRef.current.value)
          ws.send(inputRef.current.value)
        // if (e.charCode !== 13) return;
        // ws.send(message.value);
        // message.value = '';
      });
    }
    loadData();
  }, []);


  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    // Faça algo com o texto inserido
    setMessages([...messages, inputText]);
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
          ref={inputRef}
        />
        <Pressable
          style={styles.sendButton}
          title="Enviar"
          onPress={handleButtonPress}
          ref={senderRef}
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
