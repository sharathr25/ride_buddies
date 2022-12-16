import React from 'react';
import { Link } from 'react-router-native';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';

const Home = () => {
  return (
    <Box>
      <Text>Home</Text>
      <Link to="/sign-in">
        <Text color="link">SIGN IN</Text>
      </Link>
      <Link to="/sign-up">
        <Text color="link">SIGN UP</Text>
      </Link>
    </Box>
  );
};

export default Home;
