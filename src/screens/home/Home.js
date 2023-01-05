import React from 'react';
import { Link } from '@react-navigation/native';
import { signOut } from '../../api/firebase/auth';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Button from '../../components/molecules/Button';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      {user ? (
        <Button title="Sign out" onPress={signOut} />
      ) : (
        <Box>
          <Link to={{ screen: 'SignIn' }}>
            <Text color="link">SIGN IN</Text>
          </Link>
          <Link to={{ screen: 'SignUp' }}>
            <Text color="link">SIGN UP</Text>
          </Link>
        </Box>
      )}
    </Box>
  );
};

export default Home;
