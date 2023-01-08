import React, { useContext } from 'react';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import Toggle from '../../components/atoms/Toggle';
import Box from '../../components/atoms/Box';
import Screen from '../../components/molecules/Screen';
import { ThemeContext } from '../../ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Screen style={{ justifyContent: 'flex-start' }}>
      <Box
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        padding="l"
      >
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="moon" size={25} color={theme.colors.foreground} />
          <Text style={{ marginLeft: 10, fontWeight: 'bold' }}>Dark Mode</Text>
        </Box>
        <Toggle onValueChange={toggleTheme} value={isDarkMode} />
      </Box>
    </Screen>
  );
};

export default Settings;
