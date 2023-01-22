import React, { useContext } from 'react';
import { Switch } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';

const Toggle = ({ onValueChange, value }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Switch
      trackColor={{ false: theme.colors.darkGray, true: `${theme.colors.primary}b3` }}
      thumbColor={value ? theme.colors.primary : theme.colors.lightGray}
      ios_backgroundColor="#3e3e3e"
      onValueChange={onValueChange}
      value={value}
    />
  );
};

export default Toggle;
