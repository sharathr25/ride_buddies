import React from 'react';
import Box from '../../atoms/Box';
import Text from '../../atoms/Text';

const Devider = ({ children = 'or', color = 'darkGray', width = '100%' }) => (
  <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
    <Box style={{ height: 1, width }} backgroundColor={color} />
    <Text color={color} style={{ marginHorizontal: children ? 10 : 0 }}>
      {children}
    </Text>
    <Box style={{ height: 1, width }} backgroundColor={color} />
    <Box />
  </Box>
);

export default Devider;
