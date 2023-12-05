import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function App() {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (text) => {
    setInputText(text);
  };

  const handleButtonPress = () => {
    // Faça algo com o texto inserido
    console.log("Texto inserido:", inputText);
  };

  return (
    <View style={styles.messageContainerOUT}>
      <View
        style={styles.messageContainerIN}
      >
        <TextInput
          style={styles.textInput}
          placeholder="Digite aqui"
          onChangeText={handleInputChange}
          value={inputText}
        />
        <TouchableOpacity style={styles.sendButton}
          title="Enviar"
          onPress={handleButtonPress}>
          <Text>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageContainerOUT: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "beige",
  },

  messageContainerIN: {
    flexDirection:"row",
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },

  textInput: {
    height: 40,
    width: "75%",
    borderColor: "gray",
    backgroundColor: "white",
    borderBottomLeftRadius:10,
    borderTopLeftRadius:10,
    borderWidth: 1,
    textAlign: "left",
    paddingLeft: 10
  },

  sendButton: {
    height: 40,
    width: "25%",
    backgroundColor: "darkolivegreen",
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
});
