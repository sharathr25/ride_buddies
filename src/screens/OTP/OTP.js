import React from 'react';
import { Pressable } from 'react-native';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import PinInput from '../../components/molecules/PinInput';
import useForm from '../../hooks/useForm';
import { updateProfile, validateOTP } from '../../api/auth';
import useKeyboard from '../../hooks/useKeyboard';

import SVGImg from '../../images/illustrations/letter.svg';

const MAX_PIN = 6;

const OTP = ({ navigation, route }) => {
  const { isKeyboardShown } = useKeyboard();
  const { params } = route;
  const { mobileNumber, displayName, color, screenToGo } = params;
  const onValidate = ({ otp }) => {
    const errors = {};
    if (otp.length !== MAX_PIN) errors.otp = 'Invalid OTP';
    return errors;
  };

  const onSubmit = async ({ otp }) => {
    try {
      await validateOTP(otp);
      if (displayName || color) await updateProfile({ displayName, photoURL: color });
      navigation.replace(screenToGo);
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
      {!isKeyboardShown && (
        <Box style={{ flex: 1 }}>
          <SVGImg width="100%" height="100%" />
        </Box>
      )}
      <Text variant="header">OTP?</Text>
      <Text>We have sent an OTP to {mobileNumber}</Text>
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
        <Pressable onPress={() => navigation.goBack()}>
          <Text color="link">Go back</Text>
        </Pressable>
      </Box>
    </Box>
  );
};

export default OTP;
