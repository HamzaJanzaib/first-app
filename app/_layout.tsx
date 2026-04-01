import { Stack } from "expo-router";
import { TaskProvider } from "@/context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}  
      />
    </TaskProvider>
  );
}
