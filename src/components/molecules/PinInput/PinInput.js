import React, { useContext, useRef } from 'react';
import { Pressable, TextInput as RNTextInput } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Error from '../Error';

const PinInput = ({ placeholder = '', label, error, maxPin, value, ...rest }) => {
  const inputRef = useRef();
  const { theme } = useContext(ThemeContext);

  const handleOnPress = () => {
    if (inputRef.current.isFocused()) inputRef.current.blur();
    inputRef.current.focus();
  };

  const boxDigit = (_, i) => {
    return (
      <Box
        style={{
          flex: 1 / maxPin,
          height: 45,
          borderRadius: 5,
          marginRight: i === maxPin - 1 ? 0 : 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        backgroundColor="background"
        key={i}
      >
        <Text variant="subHeader">{value[i] || ''}</Text>
      </Box>
    );
  };

  return (
    <Box>
      <Box
        padding="s"
        style={{
          position: 'relative',
          alignSelf: 'stretch',
          borderWidth: 2,
          borderRadius: 5,
          borderColor: theme.colors.lightGray,
          backgroundColor: `${theme.colors.foreground}50`,
          color: theme.colors.foreground,
        }}
      >
        {label && (
          <Text color="foreground" style={{ textTransform: 'capitalize', opacity: 0.5 }} bold>
            {label}
          </Text>
        )}
        <Pressable style={{ width: '100%', flexDirection: 'row' }} onPress={handleOnPress}>
          {new Array(maxPin).fill(0).map(boxDigit)}
        </Pressable>
        <RNTextInput
          value={value}
          maxLength={maxPin}
          style={{ color: theme.colors.foreground, padding: 0, height: 1, width: 1 }}
          ref={inputRef}
          keyboardType="number-pad"
          {...rest}
        />
      </Box>
      <Error error={error} />
    </Box>
  );
};

export default PinInput;
