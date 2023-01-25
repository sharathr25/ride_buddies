import React from 'react';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Button from '../../components/molecules/Button';
import Features from '../../components/molecules/Features';
import { API_URL } from '../../configs/api';

const Landing = ({ navigation }) => {
  const signIn = () => {
    navigation.push('SignIn');
  };

  const signUp = () => {
    navigation.push('SignUp');
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Box>
        <Text variant="header">Welcome to </Text>
        <Text variant="header" color="primary">
          Ride buddies
        </Text>
      </Box>

      <Box margin="l" />

      <Features />

      <Box margin="l" />

      <Box>
        <Button title="SIGN IN" onPress={signIn} />
        <Box margin="s" />
        <Button title="SIGN UP" outline onPress={signUp} />
      </Box>
      <Box>
        <Text>{API_URL}</Text>
      </Box>
    </Box>
  );
};

export default Landing;
