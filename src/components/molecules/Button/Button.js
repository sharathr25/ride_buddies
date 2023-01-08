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
  ...rest
}) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Pressable
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing.s,
        borderColor: theme.colors[color],
        borderRadius: 10,
        height: outline ? 48 : 50,
        borderWidth: outline ? 2 : 0,
        backgroundColor: outline ? 'transparent' : theme.colors[color],
        opacity: disabled ? 0.5 : 1,
        elevation: 0,
      }}
      onPress={disabled ? () => {} : onPress}
      {...rest}
    >
      <Text color={outline ? color : 'white'} style={{ textTransform: 'uppercase' }}>
        {title}
      </Text>
      {leftIconName && (
        <>
          <Box margin="xs" />
          <Icon name={leftIconName} color={outline ? theme.colors[color] : 'white'} size={14} />
        </>
      )}
    </Pressable>
  );
};

export default Button;
