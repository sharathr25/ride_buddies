import React from 'react';

export const ThemeContext = React.createContext({
  theme: null,
  toggleTheme: () => {},
  isDarkMode: false,
});
