import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

type HeaderProps = {
  onPressNotification?: () => void;
  onPressSearch?: () => void;
  title?: string;
};

const Header = ({ onPressNotification, onPressSearch, title = "Today's Task" }: HeaderProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]} onPress={onPressSearch}>
        <Ionicons name="search" size={22} color={colors.textPrimary} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>

      <TouchableOpacity style={[styles.iconButton, { backgroundColor: colors.surface }]} onPress={onPressNotification}>
        <Ionicons
          name="notifications-outline"
          size={22}
          color={colors.textPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
  },
});