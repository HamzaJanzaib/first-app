import React from "react";
import { FlatList, ImageBackground, ScrollView, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  const Data = [
    { key: "1" },
    { key: "2" },
    { key: "3" },
    { key: "4" },
    { key: "5" },
    { key: "6" },
    { key: "7" },
    { key: "8" },
    { key: "9" },
    { key: "10" },
    {
      key: "11"
    },
    { key: "12"
    },
    {
      key: "13"
    },
    {
      key: "14"
    },
    {
      key: "15"
    },

  ]
  return (
    <SafeAreaProvider
    >
      <FlatList
        data={Data}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Text
            style={{ fontSize: 24, padding: 20 }}
          >
            Item {item.key}
          </Text>
        )}
      />

    </SafeAreaProvider>
  );
}
