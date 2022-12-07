const palette = {
  purple: '#5837D0',
  green: '#0ECD9D',
  red: '#FF5D5D',
  black: '#0B0B0B',
  white: '#F0F2F3',
  lightGray: '#9E9E9E',
  darkGray: '#757575',
  blue: '#009EFF',
};

export const theme = {
  colors: {
    background: palette.white,
    foreground: palette.black,
    primary: palette.purple,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    white: palette.white,
    lightGray: palette.lightGray,
    darkGray: palette.darkGray,
    link: palette.blue,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    subHeader: {
      fontSize: 26,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 16,
    },
    info: {
      fontSize: 13,
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: palette.black,
    foreground: palette.white,
  },
};
