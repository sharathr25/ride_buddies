import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';
import Text from '../../atoms/Text';

const CheckBox = ({ label = '', error, isChecked, onChange }) => {
  const { theme } = useContext(ThemeContext);

  const onPress = () => {
    onChange(!isChecked);
  };

  return (
    <Box>
      <Box
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {label && (
          <Text
            color="foreground"
            style={{ fontWeight: '600', textTransform: 'capitalize', opacity: 0.5, marginRight: 5 }}
          >
            {label}
          </Text>
        )}
        <Pressable
          onPress={onPress}
          style={{
            borderColor: isChecked ? theme.colors.primary : theme.colors.lightGray,
            width: 25,
            height: 25,
            borderRadius: 5,
            borderWidth: 2,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {isChecked && <Icon name="check" size={15} color={theme.colors.primary} />}
        </Pressable>
      </Box>
      {error && <Text color="danger">{error}</Text>}
    </Box>
  );
};

export default CheckBox;
