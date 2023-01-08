import React from 'react';
import { ScrollView } from 'react-native';
import { Link } from '@react-navigation/native';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import useForm from '../../hooks/useForm';
import { validateDisplayName, validateMobileNumber } from '../../utils/validators';
import ColorPicker from '../../components/molecules/ColorPicker';
import { signInWithPhoneNumber } from '../../api/firebase/auth';

const SignUp = ({ navigation }) => {
  const onValidate = ({ mobileNumber, displayName }) => {
    const errors = {};
    const mobileNumberErr = validateMobileNumber(mobileNumber);
    const displayNameErr = validateDisplayName(displayName);
    if (mobileNumberErr) errors.mobileNumber = mobileNumberErr;
    if (displayNameErr) errors.displayName = displayNameErr;
    return errors;
  };

  const onSubmit = async ({ mobileNumber, displayName, color }) => {
    try {
      const mobileNumberWithCountryCode = `+91${mobileNumber}`;
      await signInWithPhoneNumber(mobileNumberWithCountryCode);
      navigation.push('OTP', {
        mobileNumber: mobileNumberWithCountryCode,
        displayName,
        color,
        screenToGo: 'HomeTabs',
      });
    } catch (error) {
      console.error('Something went wrong while sign up');
    }
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { mobileNumber: '', displayName: '', color: '' },
    onValidate,
    onSubmit,
  });

  return (
    <ScrollView>
      <Box
        backgroundColor="background"
        padding="xl"
        style={{ flex: 1, justifyContent: 'flex-end' }}
      >
        <Text variant="header">Hello!</Text>
        <Text>Let's create an account!</Text>
        <Box margin="s" />
        <TextInput
          label="Mobile number"
          value={form.values.mobileNumber}
          onChangeText={setForm('mobileNumber')}
          onBlur={validate}
          error={form.errors.mobileNumber}
        />
        <Box margin="xs" />
        <TextInput
          label="display name"
          value={form.values.displayName}
          onChangeText={setForm('displayName')}
          onBlur={validate}
          error={form.errors.displayName}
        />
        <Box margin="xs" />
        <ColorPicker
          onSelect={setForm('color')}
          label="Your favourite color"
          hint="We will choose a random color if you don't choose"
          value={form.values.color}
        />
        <Box margin="s" />
        <Button title="Get OTP" onPress={handleSubmit} disabled={!isValid()} />
        <Box margin="xs" />
        <Box style={{ flexDirection: 'row' }}>
          <Text>Already a member? </Text>
          <Link to={{ screen: 'SignIn' }}>
            <Text color="link">Sign In</Text>
          </Link>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default SignUp;
