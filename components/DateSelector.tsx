import Colors from "@/constants/color";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

type DateItem = {
  month: string;
  day: number;
  weekday: string;
  key: string;
};

const generateDates = (): DateItem[] => {
  const base = new Date(2026, 2, 23);
  return Array.from({ length: 5 }, (_, i) => {
    const date = new Date(base);
    date.setDate(base.getDate() + i);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      key: date.toISOString().split('T')[0], // YYYY-MM-DD format for easy matching
    };
  });
};

export const DATES = generateDates();

type DateSelectorProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

const DateSelector = ({ selectedDate, onSelectDate }: DateSelectorProps) => {

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {DATES.map((item) => {
        const isSelected = item.key === selectedDate;

        return (
          <TouchableOpacity
            key={item.key}
            style={[styles.dateItem, isSelected && styles.dateItemSelected]}
            onPress={() => onSelectDate(item.key)}
          >
            <Text style={[styles.month, isSelected && styles.selectedText]}>
              {item.month}
            </Text>

            <Text style={[styles.day, isSelected && styles.selectedText]}>
              {item.day}
            </Text>

            <Text style={[styles.weekday, isSelected && styles.selectedText]}>
              {item.weekday}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DateSelector;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 10,
  },
  dateItem: {
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 64,
  },
  dateItemSelected: {
    backgroundColor: Colors.primary,
  },
  month: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  day: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  weekday: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  selectedText: {
    color: "#FFFFFF",
  },
});