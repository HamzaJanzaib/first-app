import React from "react";
import { Button, ScrollView, Switch, Text, View } from "react-native";

export default function Index() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic"
    >
      <Text>Hello World.</Text>
      <Button
        title="Press me"
        onPress={() => alert("Button pressed!")}
      />
        {
          [...Array(60)].map((_, i) => (
            <Text key={i}>Item {i + 1}</Text>
          ))
        }
      <Switch
        trackColor={{ false: "#767577", true: "#81b91a" }}
        thumbColor={true ? "#f5ddff" : "#f4f3f4"}
        onValueChange={(value) => {
          setIsSwitchOn(value);
        }}
        value={isSwitchOn}
      />

    </ScrollView>
  );
}
