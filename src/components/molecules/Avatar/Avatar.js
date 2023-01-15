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
          borderRadius: size / 2,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundColor || theme.colors.primary,
        }}
      >
        {initial ? (
          <Text
            style={{
              width: size / 2,
              height: size / 2,
              fontSize: size / 2,
              lineHeight: size / 2,
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
            color="white"
          >
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
