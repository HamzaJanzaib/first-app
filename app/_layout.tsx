import { Stack } from "expo-router";
import { TaskProvider } from "@/context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="(tabs)"
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="task/[id]" options={{ presentation: 'card' }} />
      </Stack>
    </TaskProvider>
  )
}
