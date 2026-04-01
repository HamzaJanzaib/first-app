import { Stack } from "expo-router";
import { TaskProvider } from "@/context/TaskContext";
import Colors from "@/constants/color";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <TaskProvider>
      <View style={{ flex: 1, backgroundColor: Colors.background }}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'fade_from_bottom',
            animationDuration: 300,
          }}
          initialRouteName="(tabs)"
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="task/[id]" 
            options={{ 
              presentation: 'card',
              animation: 'slide_from_right' 
            }} 
          />
          <Stack.Screen 
            name="edit-task" 
            options={{ 
              presentation: 'modal',
              animation: 'slide_from_bottom'
            }} 
          />
        </Stack>
      </View>
    </TaskProvider>
  )
}
