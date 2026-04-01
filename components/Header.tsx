import Colors from "@/constants/color";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type HeaderProps = {
  onPressNotification?: () => void;
  onPressSearch?: () => void;
  title?: string;
};

const Header = ({ onPressNotification, onPressSearch, title = "Today's Task" }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconButton} onPress={onPressSearch}>
        <Ionicons name="search" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.iconButton} onPress={onPressNotification}>
        <Ionicons
          name="notifications-outline"
          size={22}
          color={Colors.textPrimary}
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
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
});