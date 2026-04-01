import React from "react";
import { Image, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        
        <Image
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={{ width: 64, height: 64 }}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
}
