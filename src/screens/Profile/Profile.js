import React from 'react';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import Button from '../../components/molecules/Button';
import useAuth from '../../hooks/useAuth';

import MobileIcon from '../../images/icons/mobile.svg';
import { formatPhoneNumber } from '../../utils/formators';

const Profile = ({ navigation }) => {
  const { user } = useAuth();
  const { displayName, phoneNumber, photoURL } = user || {};
  const initial = displayName ? displayName.charAt(0) : '';

  const handleEditProfileClick = () => {
    navigation.push('EditProfile');
  };

  return (
    <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Avatar initial={initial} size={100} backgroundColor={photoURL} />
      <Text variant="header">{displayName}</Text>
      <Box margin="s" />

      <Box style={{ flex: 0.5 }} padding="s">
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <MobileIcon width={25} height={25} />
          <Box margin="s" />
          <Text>{formatPhoneNumber(phoneNumber)}</Text>
        </Box>
        <Box margin="s" />
        <Button title="Edit Profile" onPress={handleEditProfileClick} />
      </Box>
    </Box>
  );
};

export default Profile;
