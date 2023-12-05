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
    <View style={styles.container}>
      <View
        style={{flexDirection:"row"}}
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
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "azure",
  },

  textInput: {
    height: 40,
    width: "65%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderBottomLeftRadius:10,
    borderTopLeftRadius:10,
  },

  sendButton: {
    width: "25%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "aqua",
    borderBottomRightRadius:10,
    borderTopRightRadius:10,
  },
});
