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
import useAuth from '../../hooks/useAuth';
import { signInWithPhoneNumber } from '../../api/auth';
import { INDIA_COUNTRY_CODE } from '../../constants';

const EditProfile = ({ navigation }) => {
  const { user } = useAuth();
  const { displayName, photoURL, phoneNumber } = user;

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
      const mobileNumberWithCountryCode = `${INDIA_COUNTRY_CODE}${mobileNumber}`;
      await signInWithPhoneNumber(mobileNumberWithCountryCode);
      navigation.push('OTP', {
        mobileNumber: mobileNumberWithCountryCode,
        displayName,
        color,
        screenToGo: 'Profile',
      });
    } catch (error) {
      console.log(error);
      console.error('Something went wrong while sigining in');
    }
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { mobileNumber: phoneNumber.slice(-10), displayName, color: photoURL },
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
        <Text>Let's update your profile!</Text>
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
          value={form.values.color}
        />
        <Box margin="s" />
        <Button title="Update" onPress={handleSubmit} disabled={!isValid()} />
        <Box margin="xs" />
        <Box style={{ flexDirection: 'row' }}>
          <Text>Don't wanna edit? </Text>
          <Link to={{ screen: 'Profile' }}>
            <Text color="link">Go Back</Text>
          </Link>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default EditProfile;
