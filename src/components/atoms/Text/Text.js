import React, { useContext } from 'react';
import { Text as RNText } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';

const Text = ({ style, variant = 'body', color = 'foreground', bold = false, ...rest }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <RNText
      style={{
        color: theme.colors[color],
        fontWeight: bold ? '600' : 'normal',
        ...theme.textVariants[variant],
        ...style,
      }}
      {...rest}
    />
  );
};

export default Text;
