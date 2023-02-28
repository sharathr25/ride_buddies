import React, { useContext } from 'react';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Avatar from '../../molecules/Avatar';
import useAuth from '../../../hooks/useAuth';

const Header = ({ navigation }) => {
  const { user } = useAuth();
  const { displayName } = user || {};
  const { theme } = useContext(ThemeContext);
  const initial = displayName ? displayName.charAt(0) : '';

  return (
    <Box
      style={{
        height: 50,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.m,
        flexDirection: 'row',
        backgroundColor: theme.colors.background,
      }}
    >
      {user && <Avatar onPress={() => navigation.push('Profile')} initial={initial} />}
    </Box>
  );
};

export default Header;
