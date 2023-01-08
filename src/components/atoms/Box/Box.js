import React, { useContext } from 'react';
import { View } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';

const Box = ({ style, padding, margin, backgroundColor, ...rest }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View
      style={{
        margin: theme.spacing[margin],
        padding: theme.spacing[padding],
        backgroundColor: theme.colors[backgroundColor],
        ...style,
      }}
      {...rest}
    />
  );
};

export default Box;
