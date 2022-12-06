import React, { useContext } from 'react';
import { Text as RNText } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';

const Text = ({ style, variant = 'body', color = 'foreground', ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <RNText
      style={{
        color: theme.colors[color],
        ...theme.textVariants[variant],
        ...style,
      }}
      {...rest}
    />
  );
};

export default Text;
