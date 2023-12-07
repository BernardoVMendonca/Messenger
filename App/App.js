import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const port = 44001;
  const [ws, setWs] = useState();
  const [id, steId] = useState("");

  useEffect(() => {
    let ws = new WebSocket(`ws://179.233.125.209:${port}`);
    setWs(ws);

    ws.onopen = () => {
      console.log("connected");
    };

    ws.addEventListener("message", (message) => {
      console.log(`Recebido: ${message.data}`);
      setMessages((messages) => [...messages, message.data]);
    });
  }, []);

  const handleIdChange = (id) => {
    steId(id);
  };
  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    if (!inputText) return;
    // Faça algo com o texto inserido
    //setMessages([...messages, inputText]);
    console.log("-----------------------");
    messages.map((message, index) =>
      console.log(messages.length + " " + message + " " + index)
    );

    // let message = {id: id, text: inputText};

    ws.send(JSON.stringify({
      id: id,
      message: inputText,
      dateTime: new Date()
    })
    );
    setInputText("");
  };

  return (
    <View style={styles.app}>
      {/* Id */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.idInput}
          placeholder="Id"
          onChangeText={handleIdChange}
          value={id}
        />
      </View>

      {/* Mensagens */}
      <ScrollView style={styles.messageContainer}>
        {messages.map((message, index) => (
          <Text key={index} style={styles.message}>
            {message.id}
            {message.message}
            {message.dateTime}
          </Text>
        ))}
      </ScrollView>

      {/* Enviar e escrever mensagem */}
      <View style={styles.inputContainer}>
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
  app: {
    backgroundColor: "beige",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },

  inputContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "5vh",
    paddingBottom: "1vh"
  },

  messageContainer: {
    flexDirection: "column-reverse",
    height: "80vh",
    width: "100vw",
    marginBottom: "1vh",
  },

  message: {
    flex: 1,
    flexWrap: 10,
    width: "max-content",
    maxWidth: "93vw",
    fontSize: "18px",
    borderWidth: 1,
    paddingLeft: "1vw",
    paddingRight: "1vw",
    paddingBottom: "1vh",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
    borderColor: "gray",
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
    width: "30%",
    backgroundColor: "darkolivegreen",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
  },

  idInput: {
    width: "100%",
    borderColor: "gray",
    backgroundColor: "white",
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    textAlign: "left",
    paddingLeft: 10,
    fontSize: "18px",
    textAlign: "center"
  },
});
