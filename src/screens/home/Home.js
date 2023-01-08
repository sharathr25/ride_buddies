import React from 'react';
import { Link } from '@react-navigation/native';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Screen from '../../components/molecules/Screen';
import useAuth from '../../hooks/useAuth';

const Home = () => {
  const { user } = useAuth();

  return (
    <Screen>
      <Text>Home</Text>
      {!user && (
        <Box>
          <Link to={{ screen: 'SignIn' }}>
            <Text color="link">SIGN IN</Text>
          </Link>
          <Link to={{ screen: 'SignUp' }}>
            <Text color="link">SIGN UP</Text>
          </Link>
        </Box>
      )}
    </Screen>
  );
};

export default Home;
