import React from 'react';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import { Link } from 'react-router-native';

const SignIn = () => {
  return (
    <Box backgroundColor="background" padding="xl" style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Text variant="header">Hello Again!</Text>
      <Text>Welcome back you've been missed!</Text>
      <Box margin="m" />
      <TextInput label="Mobile number" />
      <Box margin="s" />
      <Button title="Get OTP" onPress={() => alert('hello')} />
      <Box margin="m" />
      <Box style={{ flexDirection: 'row' }}>
        <Text>Not a member? </Text>
        <Link to="/sign-up">
          <Text color="link">Register Now</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default SignIn;
