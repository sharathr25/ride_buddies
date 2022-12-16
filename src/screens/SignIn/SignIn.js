import React, { useState } from 'react';
import { Link, useLinkPressHandler } from 'react-router-native';
import auth from '@react-native-firebase/auth';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import { validateMobileNumber } from '../../utils/validators';
import useForm from '../../hooks/useForm';
import useKeyboard from '../../hooks/useKeyboard';

import SVGImg from '../../images/illustrations/travelling.svg';

const SignIn = () => {
  const { isKeyboardShown } = useKeyboard();
  const [confirm, setConfirm] = useState(null);
  const redirect = useLinkPressHandler();
  console.log(redirect);

  const onValidate = ({ mobileNumber }) => {
    const errors = {};
    const mobileNumberErr = validateMobileNumber(mobileNumber);
    if (mobileNumberErr) errors.mobileNumber = mobileNumberErr;
    return errors;
  };

  const confirmOTP = async () => {
    try {
      await confirm.confirm(code);
    } catch (error) {
      alert('Invalid code.');
    }
  };

  const onSubmit = async ({ mobileNumber }) => {
    const confirmation = await auth().signInWithPhoneNumber(`+91${mobileNumber}`);
    setConfirm(confirmation);
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { mobileNumber: '' },
    onValidate,
    onSubmit,
  });

  return (
    <Box backgroundColor="background" padding="xl" style={{ flex: 1, justifyContent: 'flex-end' }}>
      {!isKeyboardShown && (
        <Box style={{ flex: 1 }}>
          <SVGImg width="100%" height="100%" />
        </Box>
      )}
      <Text variant="header">Hello Again!</Text>
      <Text>Welcome back you've been missed!</Text>
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
