import { Button, Text, View } from "react-native";

export default function Index() {
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
    </View>
  );
}
