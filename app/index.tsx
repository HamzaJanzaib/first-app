import React from "react";
import { Button, Pressable, ScrollView, TextInput } from "react-native";

export default function Index() {
  const [text, setText] = React.useState("");
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
    >
    <Pressable onPressIn={() => alert("Hello world!")}>
     <Button title="Press me" onPress={() => alert("Hello world!")} />
    </Pressable>

    </ScrollView>
  );
}
