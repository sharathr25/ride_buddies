import React from 'react';
import { Link, useLinkPressHandler } from 'react-router-native';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import PinInput from '../../components/molecules/PinInput';
import useForm from '../../hooks/useForm';
import { validateOTP } from '../../api/firebase/auth';

import SVGImg from '../../images/illustrations/letter.svg';

const MAX_PIN = 6;

const OTP = () => {
  const goToHomePage = useLinkPressHandler('/');
  const onValidate = ({ otp }) => {
    const errors = {};
    if (otp.length !== MAX_PIN) errors.otp = 'Invalid OTP';
    return errors;
  };

  const onSubmit = async ({ otp }) => {
    try {
      await validateOTP(otp);
      goToHomePage();
    } catch (error) {
      alert('Invalid OTP');
    }
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { otp: '' },
    onValidate,
    onSubmit,
  });

  return (
    <Box backgroundColor="background" padding="xl" style={{ flex: 1, justifyContent: 'flex-end' }}>
      <Box style={{ flex: 1 }}>
        <SVGImg width="100%" height="100%" />
      </Box>
      <Text variant="header">OTP?</Text>
      <Text>We have sent an OTP to xxxxx-xx999</Text>
      <Box margin="m" />
      <PinInput
        label="One time password"
        value={form.values.otp}
        onChangeText={setForm('otp')}
        onBlur={validate}
        error={form.errors.otp}
        maxPin={MAX_PIN}
      />
      <Box margin="s" />
      <Button title="Submit" onPress={handleSubmit} disabled={!isValid()} />
      <Box margin="m" />
      <Box style={{ flexDirection: 'row' }}>
        <Text>Wrong number? </Text>
        <Link to="/sign-up">
          <Text color="link">Go back</Text>
        </Link>
      </Box>
    </Box>
  );
};

export default OTP;
