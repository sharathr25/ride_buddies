import React, { useContext } from 'react';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import Toggle from '../../components/atoms/Toggle';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import { ThemeContext } from '../../ThemeContext';

const Settings = ({ navigation }) => {
  const { isDarkMode, toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Box backgroundColor="background" style={{ justifyContent: 'flex-start', flex: 1 }} padding="l">
      <Text variant="header">Settings</Text>
      <Box margin="l" />
      <Box
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="moon-waning-crescent" size={25} color={theme.colors.foreground} />
          <Text style={{ marginLeft: 10 }} bold>
            Dark Mode
          </Text>
        </Box>
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text>{isDarkMode ? 'On' : 'Off'}</Text>
          <Box margin="xs" />
          <Toggle onValueChange={toggleTheme} value={isDarkMode} />
        </Box>
      </Box>
      <Box margin="m" />
      <Box
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="file-document" size={25} color={theme.colors.foreground} />
          <Text style={{ marginLeft: 10 }} bold>
            Terms of Use
          </Text>
        </Box>
        <Button
          onPress={() => navigation.push('TermsOfUse')}
          rightIconName="chevron-right"
          size="xs"
        />
      </Box>
      <Box margin="m" />
      <Box
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name="shield-lock" size={25} color={theme.colors.foreground} />
          <Text style={{ marginLeft: 10 }} bold>
            Pivacy Policy
          </Text>
        </Box>
        <Button
          onPress={() => navigation.push('PrivacyPolicy')}
          rightIconName="chevron-right"
          size="xs"
        />
      </Box>
    </Box>
  );
};

export default Settings;
