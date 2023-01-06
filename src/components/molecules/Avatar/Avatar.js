import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import { ThemeContext } from '../../../ThemeContext';

import AvatarIcon from '../../../images/icons/avatar.svg';

const Avatar = ({ onPress = () => {}, size = 40, initial, backgroundColor }) => {
  const theme = useContext(ThemeContext);

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
            }}
            color="background"
          >
            {initial}
          </Text>
        ) : (
          <AvatarIcon width={size} height={size} />
        )}
      </Box>
    </Pressable>
  );
};

export default Avatar;
