import React from 'react';
import { Link } from 'react-router-native';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import useForm from '../../hooks/useForm';
import { validateMobileNumber } from '../../utils/validators';

import SVGImg from '../../images/illustrations/trip.svg';

const SignUp = () => {
  const onValidate = ({ mobileNumber }) => {
    const errors = {};
    const mobileNumberErr = validateMobileNumber(mobileNumber);
    if (mobileNumberErr) errors.mobileNumber = mobileNumberErr;
    return errors;
  };

  const onSubmit = (values) => {
    // TODO: signup with mobile number
    console.log(values);
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { mobileNumber: '' },
    onValidate,
    onSubmit,
  });

  return (
    <Box backgroundColor="background" padding="xl" style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Box style={{ flex: 1 }}>
        <SVGImg width="100%" height="100%" />
      </Box>
      <Text variant="header">Hello!</Text>
      <Text>Let's create an account!</Text>
      <Box margin="m" />
      <TextInput
        label="Mobile number"
        value={form.values.mobileNumber}
        onChangeText={setForm('mobileNumber')}
        onBlur={validate}
        error={form.errors.mobileNumber}
      />
      <Box margin="s" />
      <Button title="Get OTP" onPress={handleSubmit} disabled={!isValid()} />
      <Box margin="s" />
      <Box style={{ flexDirection: 'row' }}>
        <Text>Already a member? </Text>
        <Link to="/sign-in">
          <Text color="link">Sign In</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default SignUp;
