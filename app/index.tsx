import React from "react";
import { FlatList, ImageBackground, ScrollView, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <FlatList
          data={[{ key: "1"  }, { key: "2" }, { key: "3" }]}
          renderItem={({ item }) => (
           <Text style={{ fontSize: 24, padding: 20 }}>Item {item.key}</Text>
          )}
        />

      </ScrollView>
    </SafeAreaProvider>
  );
}
