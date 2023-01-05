import React from 'react';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import useAuth from '../../hooks/useAuth';

const Profile = () => {
  const { user } = useAuth();
  const { displayName, email, emailVerified, phoneNumber } = user || {};
  const initial = displayName ? displayName.charAt(0) : '';

  return (
    <Box>
      <Avatar initial={initial} />
      <Text>Profile</Text>
    </Box>
  );
};

export default Profile;
