import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Text from '../../atoms/Text';

const Button = ({
  title = '',
  outline,
  disabled,
  color = 'primary',
  onPress,
  leftIconName,
  size = 'm',
  style,
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing[size],
        borderColor: theme.colors[color],
        borderRadius: 10,
        borderWidth: 2,
        backgroundColor: outline ? 'transparent' : theme.colors[color],
        opacity: disabled ? 0.5 : 1,
        elevation: 0,
        ...style,
      }}
      onPress={disabled ? () => {} : onPress}
      {...rest}
    >
      {title && (
        <Text color={outline ? color : 'white'} style={{ textTransform: 'uppercase' }}>
          {title}
        </Text>
      )}
      {title && leftIconName && <Box margin="xs" />}
      {leftIconName && (
        <Icon name={leftIconName} color={outline ? theme.colors[color] : 'white'} size={18} />
      )}
    </Pressable>
  );
};

export default Button;
