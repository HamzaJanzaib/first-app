import { Task } from "@/constants/task";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "@/context/ThemeContext";

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { colors } = useTheme();

  const STATUS_COLOR = {
    Done: colors.statusDone,
    "In Progress": colors.statusInProgress,
    "Todo": colors.statusTodo,
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View style={styles.content}>
        <Text style={[styles.category, { color: colors.textSecondary }]}>{task.category}</Text>
        <Text style={[styles.title, { color: colors.textPrimary }]}>{task.title}</Text>

        <View style={styles.footer}>
          <View style={styles.timeRow}>
            <Ionicons name="time-outline" size={14} color={colors.primary} />
            <Text style={[styles.time, { color: colors.primary }]}>{task.time}</Text>
          </View>

          <Text style={[styles.status, { color: STATUS_COLOR[task.status] || colors.primary }]}>
            {task.status}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.iconBadge,
          { backgroundColor: task.icon.backgroundColor || colors.primary },
        ]}
      >
        <Ionicons name={task.icon.name as any} size={18} color={"#ffffff"} />
      </View>
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 18,
    marginHorizontal: 20,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
  },
  content: {
    flex: 1,
  },
  category: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  time: {
    fontSize: 13,
    fontWeight: "600",
  },
  status: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: 'center',
    marginLeft: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});