import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Icon from '../../atoms/Icon';

const Header = ({ navigation, back }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <Box
      style={{
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.m,
        flexDirection: 'row',
      }}
    >
      {back ? (
        <Pressable onPress={() => navigation.goBack()}>
          <Icon name="chevron-left" size={40} color={theme.colors.primary} />
        </Pressable>
      ) : null}
    </Box>
  );
};

export default Header;
