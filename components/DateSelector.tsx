import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import * as Haptics from 'expo-haptics';
import Animated, { FadeInRight } from 'react-native-reanimated';
import { useTheme } from "@/context/ThemeContext";

type DateItem = {
  month: string;
  day: number;
  weekday: string;
  key: string;
};

const generateDates = (): DateItem[] => {
  const base = new Date();
  base.setDate(base.getDate() - 3); 
  return Array.from({ length: 14 }, (_, i) => { 
    const date = new Date(base);
    date.setDate(base.getDate() + i);
    return {
      month: date.toLocaleDateString("en-US", { month: "short" }),
      day: date.getDate(),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
      key: date.toISOString().split('T')[0],
    };
  });
};

export const DATES = generateDates();
export const TODAY_KEY = DATES[3].key;

type DateSelectorProps = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

const DateSelector = ({ selectedDate, onSelectDate }: DateSelectorProps) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {DATES.map((item, index) => {
        const isSelected = item.key === selectedDate;

        return (
          <Animated.View key={item.key} entering={FadeInRight.delay(index * 50).springify()}>
            <TouchableOpacity
              style={[
                styles.dateItem, 
                isSelected ? { backgroundColor: colors.primary } : { backgroundColor: 'transparent' }
              ]}
              onPress={() => {
                Haptics.selectionAsync();
                onSelectDate(item.key);
              }}
            >
              <Text style={[styles.month, { color: isSelected ? "#fff" : colors.textSecondary }]}>
                {item.month}
              </Text>

              <Text style={[styles.day, { color: isSelected ? "#fff" : colors.textPrimary }]}>
                {item.day}
              </Text>

              <Text style={[styles.weekday, { color: isSelected ? "#fff" : colors.textSecondary }]}>
                {item.weekday}
              </Text>
            </TouchableOpacity>
          </Animated.View>
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
  month: {
    fontSize: 12,
    marginBottom: 6,
    fontWeight: '500',
  },
  day: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  weekday: {
    fontSize: 12,
    fontWeight: '500',
  },
});