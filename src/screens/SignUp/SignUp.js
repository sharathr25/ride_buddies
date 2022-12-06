import React from 'react';
import { Link } from 'react-router-native';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';

const SignUp = () => {
  return (
    <Box backgroundColor="background" padding="xl" style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Text variant="header">Hello!</Text>
      <Text>Let's create an account!</Text>
      <Box margin="m" />
      <TextInput label="Mobile number" />
      <Box margin="s" />
      <Button title="Get OTP" onPress={() => alert('hello')} />
      <Box margin="m" />
      <Box style={{ flexDirection: 'row' }}>
        <Text>Already a member? </Text>
        <Link to="/sign-in" replace>
          <Text color="link">Sign In</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
