import React from "react";
import { Pressable, ScrollView, TextInput } from "react-native";

export default function Index() {
  const [text, setText] = React.useState("");
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
    >
    <Pressable onPress={() => alert("Hello world!")}>
      <TextInput
        value={text}
        onChange={(e) => setText(e.nativeEvent.text)}
        placeholder="Type something"
      />
    </Pressable>

    </ScrollView>
  );
}
