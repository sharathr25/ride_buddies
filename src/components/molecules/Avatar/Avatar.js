import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import { ThemeContext } from '../../../ThemeContext';

import AvatarIcon from '../../../images/icons/avatar.svg';

const Avatar = ({ onPress = () => {}, size = 40, initial }) => {
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
          backgroundColor: theme.colors.primary,
        }}
      >
        {initial ? (
          <Text style={{ fontSize: size / 2 }} color="background">
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
