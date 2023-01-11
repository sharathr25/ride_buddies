import React from 'react';
import { Link } from '@react-navigation/native';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import { validateMobileNumber } from '../../utils/validators';
import useForm from '../../hooks/useForm';
import useKeyboard from '../../hooks/useKeyboard';
import { signInWithPhoneNumber } from '../../api/firebase/auth';
import { INDIA_COUNTRY_CODE } from '../../constants';

import SVGImg from '../../images/illustrations/trip.svg';

const SignIn = ({ navigation }) => {
  const { isKeyboardShown } = useKeyboard();

  const onValidate = ({ mobileNumber }) => {
    const errors = {};
    const mobileNumberErr = validateMobileNumber(mobileNumber);
    if (mobileNumberErr) errors.mobileNumber = mobileNumberErr;
    return errors;
  };

  const onSubmit = async ({ mobileNumber }) => {
    try {
      const mobileNumberWithCountryCode = `${INDIA_COUNTRY_CODE}${mobileNumber}`;
      await signInWithPhoneNumber(mobileNumberWithCountryCode);
      navigation.push('OTP', { mobileNumber: mobileNumberWithCountryCode, screenToGo: 'HomeTabs' });
    } catch (error) {
      console.error('Something went wrong while sigining in');
    }
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
        <Link to={{ screen: 'SignUp' }}>
          <Text color="link">Register Now</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default SignIn;
