import { FILTER_OPTIONS, FilterOptions } from "@/constants/task";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useTheme } from "@/context/ThemeContext";

type FilterTabsProps = {
  selected: FilterOptions;
  onSelect: (filter: FilterOptions) => void;
};

const FilterTabs = ({ selected, onSelect }: FilterTabsProps) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {FILTER_OPTIONS.map((item) => {
        const isSelected = item === selected;

        return (
          <TouchableOpacity
            key={item}
            style={[
              styles.tab, 
              { backgroundColor: isSelected ? colors.primary : colors.surface, borderColor: isSelected ? colors.primary : colors.border }
            ]}
            onPress={() => onSelect(item)}
          >
            <Text
              style={[
                styles.tabText, 
                { color: isSelected ? "#fff" : colors.textSecondary, fontWeight: isSelected ? "700" : "500" }
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterTabs;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 12,
    paddingVertical: 12,
  },
  tab: {
    alignSelf: "flex-start",
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
  },
});