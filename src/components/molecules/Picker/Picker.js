import { useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';
import { ThemeContext } from '../../../ThemeContext';

const CustomPicker = ({ label, hint, options = [], selectedValue, onValueChange, ...rest }) => {
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
          backgroundColor: `${theme.colors.foreground}30`,
          color: theme.colors.foreground,
        }}
      >
        {label && (
          <Text
            color="foreground"
            style={{
              fontWeight: '600',
              textTransform: 'capitalize',
              opacity: 0.5,
              position: 'absolute',
              left: 10,
            }}
          >
            {label}
          </Text>
        )}
        <Picker selectedValue={selectedValue} onValueChange={onValueChange} {...rest}>
          {options.map((o) => (
            <Picker.Item
              label={o.label}
              value={o.value}
              key={o.value}
              color={theme.colors.foreground}
            />
          ))}
        </Picker>
      </Box>
      {hint && (
        <Text variant="info" color="darkGray">
          {hint}
        </Text>
      )}
    </Box>
  );
};

export default CustomPicker;
