import React from "react";
import { Button, Switch, Text, View } from "react-native";

export default function Index() {
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  return (
    <View
      style={{
        flex: 1,
        gap: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello World.</Text>
      <Button
        title="Press me"
        onPress={() => alert("Button pressed!")}
      />
      <Switch
        trackColor={{ false: "#767577", true: "#81b91a" }}
        thumbColor={true ? "#f5ddff" : "#f4f3f4"}
        onValueChange={(value) => {
          setIsSwitchOn(value);
        }}
        value={isSwitchOn}
      />

    </View>
  );
}
