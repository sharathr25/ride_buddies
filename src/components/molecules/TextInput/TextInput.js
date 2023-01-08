import React, { useContext } from 'react';
import { TextInput as RNTextInput } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import Error from '../Error';

const TextInput = ({ placeholder = '', label, error, hint, ...rest }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box>
      <Box
        padding="s"
        style={{
          alignSelf: 'stretch',
          borderWidth: 2,
          borderRadius: 5,
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
          style={{ color: theme.colors.foreground, padding: 0 }}
          {...rest}
        />
      </Box>
      {hint && (
        <Text variant="info" color="darkGray">
          {hint}
        </Text>
      )}
      <Error error={error} />
    </Box>
  );
};

export default TextInput;
