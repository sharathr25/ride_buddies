import React, { useContext } from 'react';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import Toggle from '../../components/atoms/Toggle';
import Box from '../../components/atoms/Box';
import { ThemeContext } from '../../ThemeContext';

const Settings = () => {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Box backgroundColor="background" style={{ justifyContent: 'flex-start' }}>
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
    </Box>
  );
};

export default Settings;
