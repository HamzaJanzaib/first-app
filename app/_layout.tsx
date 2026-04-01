import { Stack } from "expo-router";
import { TaskProvider } from "@/context/TaskContext";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <TaskProvider>
      <ThemeProvider>
        <StackWrapper />
      </ThemeProvider>
    </TaskProvider>
  )
}

function StackWrapper() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
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
  );
}
