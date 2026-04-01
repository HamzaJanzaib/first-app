import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, LightTheme } from '@/constants/color';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor } from 'react-native-reanimated';

type ThemeType = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  colors: typeof DarkTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(systemScheme || 'dark');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const colors = theme === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ 
        theme, 
        isDark: theme === 'dark', 
        colors, 
        toggleTheme 
    }}>
      <Animated.View style={[{ flex: 1, backgroundColor: colors.background }]}>
          {children}
      </Animated.View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
