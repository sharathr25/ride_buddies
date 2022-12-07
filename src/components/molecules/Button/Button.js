import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Text from '../../atoms/Text';

const Button = ({ title = '', outline, disabled, color = 'primary', onPress, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <Pressable
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderColor: theme.colors[color],
        borderRadius: 5,
        borderWidth: 2,
        backgroundColor: outline ? 'transparent' : theme.colors[color],
        opacity: disabled ? 0.5 : 1,
        elevation: 0,
      }}
      onPress={disabled ? () => {} : onPress}
      {...rest}
    >
      <Text
        color={outline ? color : 'white'}
        style={{ textTransform: 'uppercase', fontWeight: '600' }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default Button;
