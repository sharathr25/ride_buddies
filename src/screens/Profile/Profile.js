import React, { useEffect } from 'react';
import { signOut } from '../../api/auth';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import Button from '../../components/molecules/Button';
import useAuth from '../../hooks/useAuth';
import { formatPhoneNumber } from '../../utils/formators';

const Profile = ({ navigation }) => {
  const { user } = useAuth();
  const { displayName, phoneNumber, photoURL } = user || {};
  const initial = displayName ? displayName.charAt(0) : '';

  const handleEditProfileClick = () => {
    navigation.push('EditProfile');
  };

  const handleLogOutClick = async () => {
    await signOut();
  };

  useEffect(() => {
    if (!user) navigation.push('Landing');
  }, [user]);

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Text variant="header">Profile</Text>
      <Box margin="m" />

      <Box style={{ alignItems: 'center' }}>
        <Avatar initial={initial} size={100} backgroundColor={photoURL} />
        <Text variant="subHeader">{displayName}</Text>
        <Text>{formatPhoneNumber(phoneNumber)}</Text>
        <Box margin="s" />
        <Button title="Edit Profile" onPress={handleEditProfileClick} rightIconName="pencil" />
      </Box>

      <Box style={{ alignSelf: 'flex-start', marginTop: 'auto' }}>
        <Button
          title="Log out"
          onPress={handleLogOutClick}
          rightIconName="logout"
          outline
          color="danger"
        />
      </Box>
    </Box>
  );
};

export default Profile;
