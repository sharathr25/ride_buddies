import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Link } from '@react-navigation/native';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import CheckBox from '../../components/molecules/CheckBox';
import ColorPicker from '../../components/molecules/ColorPicker';
import LoadingErrModal from '../../components/molecules/LoadingErrModal';
import useForm from '../../hooks/useForm';
import { validateDisplayName, validateMobileNumber } from '../../utils/validators';
import { signInWithPhoneNumber } from '../../api/auth';
import { getUserByPhoneNumber } from '../../api/backendAuth';
import { INDIA_COUNTRY_CODE } from '../../constants';

const SignUp = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [signUpErr, setSignUpErr] = useState(null);

  const onValidate = ({ mobileNumber, displayName, termsAndPrivacyPolicyChecked }) => {
    const errors = {};
    const mobileNumberErr = validateMobileNumber(mobileNumber);
    const displayNameErr = validateDisplayName(displayName);
    if (mobileNumberErr) errors.mobileNumber = mobileNumberErr;
    if (displayNameErr) errors.displayName = displayNameErr;
    if (!termsAndPrivacyPolicyChecked)
      errors.termsAndPrivacyPolicyChecked = 'Accept Terms of Use and Privacy Policy';
    return errors;
  };

  const onSubmit = async ({ mobileNumber, displayName, color }) => {
    setLoading(true);
    const mobileNumberWithCountryCode = `${INDIA_COUNTRY_CODE}${mobileNumber}`;
    try {
      const { data } = await getUserByPhoneNumber(mobileNumberWithCountryCode);
      console.log(data);
      setLoading(false);
      setSignUpErr('User already exists');
    } catch (_) {
      try {
        await signInWithPhoneNumber(mobileNumberWithCountryCode);
        navigation.push('OTP', {
          mobileNumber: mobileNumberWithCountryCode,
          displayName,
          color,
          screenToGo: 'HomeTabs',
        });
        setTimeout(() => setLoading(false), 1000);
      } catch (_) {
        setLoading(false);
        setSignUpErr('Something went wrong while sign up');
      }
    }
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: {
      mobileNumber: '',
      displayName: '',
      color: '',
      termsAndPrivacyPolicyChecked: false,
    },
    onValidate,
    onSubmit,
  });

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Box backgroundColor="background" padding="xl" style={{ flex: 1 }}>
        <LoadingErrModal
          loading={loading}
          err={signUpErr}
          reportActionClick={() => setSignUpErr(null)}
        />
        <Text variant="header">Hello!</Text>
        <Text>Let's create an account and join your ride buddies!</Text>
        <Box margin="m" />
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
        <Box margin="xs" />
        <CheckBox
          onChange={setForm('termsAndPrivacyPolicyChecked')}
          isChecked={form.values.termsAndPrivacyPolicyChecked}
          error={form.errors.termsAndPrivacyPolicyChecked}
          label={
            <Box style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Text>I have read and accept the </Text>
              <Link to={{ screen: 'TermsOfUse' }}>
                <Text color="link">Terms of Use</Text>
              </Link>
              <Text> and </Text>
              <Link to={{ screen: 'PrivacyPolicy' }}>
                <Text color="link">Privacy Policy</Text>
              </Link>
            </Box>
          }
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
