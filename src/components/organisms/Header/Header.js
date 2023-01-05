import React, { useContext } from 'react';
import { Pressable } from 'react-native';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../atoms/Box';
import Avatar from '../../molecules/Avatar';
import useAuth from '../../../hooks/useAuth';

import BurgerMenu from '../../../images/icons/burger-menu.svg';
import Back from '../../../images/icons/back.svg';

const Header = ({ navigation, route, back }) => {
  const { user } = useAuth();
  const theme = useContext(ThemeContext);
  const initial = user?.displayName ? user.displayName.charAt(0) : '';

  const renderHeaderContent = () => {
    if (route.name === 'SignIn' || route.name === 'SignUp' || route.name === 'OTP') return null;
    if (route.name === 'Home') {
      return (
        <>
          <Pressable>
            <BurgerMenu />
          </Pressable>
          <Avatar onPress={() => navigation.push('Profile')} initial={initial} />
        </>
      );
    }

    if (back) {
      return (
        <Pressable onPress={() => navigation.goBack()}>
          <Back />
        </Pressable>
      );
    }

    return null;
  };

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
      {renderHeaderContent()}
    </Box>
  );
};

export default Header;
