import React from 'react';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import Button from '../../components/molecules/Button';
import Features from '../../components/molecules/Features';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
import { joinTrip } from '../../api/trips';
import { ScrollView } from 'react-native';

const Home = ({ navigation }) => {
  const { user } = useAuth();

  const onValidate = ({ tripCode }) => {
    const errors = {};
    if (!/^[a-z]{3}[0-9]{3}$/.test(tripCode)) errors.tripCode = 'Invalid trip code';
    return errors;
  };

  const onSubmit = async ({ tripCode }) => {
    try {
      validate();
      const { data } = await joinTrip(tripCode);
      navigation.push('Trip', data);
    } catch (error) {
      if (error.response?.status) setError('tripCode', `We didn't find trip with code ${tripCode}`);
      else console.error('Something went wrong while joining trip', error.response?.status);
    }
  };

  const { form, setForm, isValid, validate, handleSubmit, setError } = useForm({
    initialValues: { tripCode: '' },
    onValidate,
    onSubmit,
  });

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Box>
        <Text variant="header">Welcome</Text>
        <Text variant="header" color="primary">
          {user?.displayName}
        </Text>
      </Box>

      <Box margin="xs" />

      <Box>
        <TextInput
          label="Trip Code"
          error={form.errors.tripCode}
          value={form.values.tripCode}
          onChangeText={setForm('tripCode')}
          onBlur={validate}
        />
        <Button title="join" onPress={handleSubmit} disabled={!isValid()} />
      </Box>

      <Box margin="xs" />

      <ScrollView>
        <Features />
      </ScrollView>
    </Box>
  );
};

export default Home;
