import React, { useContext } from 'react';
import { signOut } from '../../api/firebase/auth';
import Box from '../../components/atoms/Box';
import Icon from '../../components/atoms/Icon';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import Button from '../../components/molecules/Button';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../ThemeContext';
import { formatPhoneNumber } from '../../utils/formators';

const Profile = ({ navigation }) => {
  const theme = useContext(ThemeContext);
  const { user } = useAuth();
  const { displayName, phoneNumber, photoURL } = user || {};
  const initial = displayName ? displayName.charAt(0) : '';

  const handleEditProfileClick = () => {
    navigation.push('EditProfile');
  };

  const handleLogOutClick = async () => {
    await signOut();
    navigation.push('Home');
  };

  return (
    <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Avatar initial={initial} size={100} backgroundColor={photoURL} />
      <Text variant="header">{displayName}</Text>
      <Box style={{ flex: 0.5 }} padding="s">
        <Box
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Icon name="phone" size={20} color={theme.colors.foreground} />
          <Box margin="s" />
          <Text>{formatPhoneNumber(phoneNumber)}</Text>
        </Box>
        <Box margin="xs" />
        <Button title="Edit Profile" onPress={handleEditProfileClick} leftIconName="edit-3" />
        <Box margin="m" />
        <Button
          title="Log out"
          onPress={handleLogOutClick}
          leftIconName="log-out"
          outline
          color="danger"
        />
      </Box>
    </Box>
  );
};

export default Profile;
