import React, { useContext, useEffect } from 'react';
import { signOut } from '../../api/auth';
import { getMyTrips } from '../../api/trips';
import Box from '../../components/atoms/Box';
import Icon from '../../components/atoms/Icon';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import Button from '../../components/molecules/Button';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../ThemeContext';
import { formatPhoneNumber } from '../../utils/formators';

/* riders
name : "sharath kumar r"
phoneNumber : "+911234567890"
*/

const Trip = ({ route }) => {
  console.log(route.params);
  const { code, name, riders } = route.params;
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { displayName, phoneNumber, photoURL } = user || {};

  return (
    <Box backgroundColor="background" padding="xl">
      <Text variant="header">{name}</Text>
      <Box>
        <Text variant="subHeader">{code}</Text>
      </Box>
    </Box>
  );
};

export default Trip;
