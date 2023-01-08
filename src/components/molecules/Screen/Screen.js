import React, { useContext } from 'react';
import Box from '../../atoms/Box';
import { ThemeContext } from '../../../ThemeContext';

const Screen = ({ children, style = {} }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
        ...style,
      }}
    >
      {children}
    </Box>
  );
};

export default Screen;
