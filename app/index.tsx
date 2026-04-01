import React from "react";
import { ScrollView, TextInput } from "react-native";

export default function Index() {
  const [text, setText] = React.useState("");
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
    >
    <TextInput
      placeholder="Enter text here..."
      value={text}
      onChangeText={(newText) => setText(newText)}
      style={{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        margin: 10,
        padding: 10,
        borderRadius: 12,
      }}
    />

    </ScrollView>
  );
}
