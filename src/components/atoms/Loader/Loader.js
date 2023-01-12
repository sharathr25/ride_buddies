import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import Box from '../Box';
import Icon from '../Icon/Icon';
import { ThemeContext } from '../../../ThemeContext';

const SIZE = 50;

const Loader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      style={{
        width: SIZE,
        height: SIZE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="bike-fast" size={SIZE} color={`${theme.colors.primary}ab`} />
      <ActivityIndicator
        size="small"
        color={theme.colors.primary}
        style={{ position: 'absolute', left: 0, bottom: 3 }}
      />
      <ActivityIndicator
        size="small"
        color={theme.colors.primary}
        style={{ position: 'absolute', right: 0, bottom: 3 }}
      />
    </Box>
  );
};

export default Loader;
