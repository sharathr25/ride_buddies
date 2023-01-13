import React, { useContext } from 'react';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../../../ThemeContext';

const Icon = (props) => {
  const { theme } = useContext(ThemeContext);
  return <MaterialCommunityIconsIcon color={theme.colors.foreground} {...props} />;
};

export default Icon;
