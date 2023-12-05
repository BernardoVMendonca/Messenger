import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
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
      >
        <TextInput
          style={styles.textInput}
          placeholder="Digite aqui"
          onChangeText={handleInputChange}
          value={inputText}
        />
      </View>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Button
          style={styles.sendButton}
          title="Enviar"
          onPress={handleButtonPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "aliceblue",
  },

  textInput: {
    height: 40,
    width: "70%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },

  sendButton: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: "oldlace",
  },
});
