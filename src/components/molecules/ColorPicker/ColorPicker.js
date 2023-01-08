import React, { useContext, useEffect } from 'react';
import { Pressable } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';

const COLORS = [
  '#DB3E00',
  '#1273DE',
  '#004DCF',
  '#5300EB',
  '#417505',
  '#BD10E0',
  '#9013FE',
  '#50E3C2',
  '#9400D3',
  '#4B0082',
  '#0000FF',
  '#00FF00',
  '#FFFF00',
  '#FF7F00',
  '#FF0000',
];

const ColorPicker = ({ label, hint, onSelect, value }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    onSelect(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, []);

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
        <Box style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {COLORS.map((c) => (
            <Pressable key={c} onPress={() => onSelect(c)} disabled={value === c}>
              <Box
                style={{
                  backgroundColor: c,
                  width: 25,
                  height: 25,
                  margin: 5,
                  borderRadius: 5,
                  borderColor: theme.colors.foreground,
                  borderWidth: value === c ? 3 : 0,
                }}
              />
            </Pressable>
          ))}
        </Box>
      </Box>
      {hint && (
        <Text variant="info" color="darkGray">
          {hint}
        </Text>
      )}
    </Box>
  );
};

export default ColorPicker;
