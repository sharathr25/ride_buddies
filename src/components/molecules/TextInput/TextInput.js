import React, { useContext } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';

const TextInput = ({ placeholder = '', label, onFocus = () => {}, onBlur = () => {}, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <Box
      style={{
        alignSelf: 'stretch',
        height: 60,
        borderWidth: 2,
        borderRadius: 5,
        padding: theme.spacing.s,
        borderColor: theme.colors.lightGray,
        backgroundColor: `${theme.colors.foreground}50`,
        color: theme.colors.foreground,
      }}
    >
      {label && (
        <Text
          color="foreground"
          style={{ fontWeight: '600', textTransform: 'capitalize', opacity: 0.5 }}
        >
          {label}
        </Text>
      )}
      <RNTextInput
        placeholder={placeholder.toUpperCase()}
        placeholderTextColor={`${theme.colors.foreground}80`}
        selectionColor={theme.colors.foreground}
        style={{ color: theme.colors.foreground }}
        {...rest}
      />
    </Box>
  );
};

export default TextInput;