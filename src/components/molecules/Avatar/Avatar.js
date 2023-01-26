import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Icon from '../../atoms/Icon';
import { ThemeContext } from '../../../ThemeContext';

const Avatar = ({ onPress = () => {}, size = 40, initial, backgroundColor }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable onPress={onPress}>
      <Box
        style={{
          height: size,
          width: size,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor || theme.colors.primary,
        }}
      >
        {initial ? (
          <Text style={{ textTransform: 'uppercase', fontSize: size / 2 }} color="white">
            {initial}
          </Text>
        ) : (
          <Icon name="account-circle-outline" color={theme.colors.white} size={size / 2} />
        )}
      </Box>
    </Pressable>
  );
};

export default Avatar;
