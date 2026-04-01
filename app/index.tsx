import React from "react";
import { Image, ImageBackground, ScrollView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaProvider>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <ImageBackground
          source={{
            uri: "https://reactnative.dev/img/tiny_logo.png",
          }}
          style={{ width: 100, height: 100 }}
        />
      </ScrollView>
    </SafeAreaProvider>
  );
}
