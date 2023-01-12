import React from 'react';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import useForm from '../../hooks/useForm';
import useKeyboard from '../../hooks/useKeyboard';
import { createTrip } from '../../api/trips';

import Illustration from '../../images/illustrations/trip.svg';

const NewTrip = ({ navigation }) => {
  const { isKeyboardShown } = useKeyboard();

  const onValidate = ({ name }) => {
    const errors = {};
    if (name === '') errors.name = 'Name is required';
    return errors;
  };

  const onSubmit = async ({ name }) => {
    try {
      const res = await createTrip({ name });
      navigation.replace('Trip', res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { name: '' },
    onValidate,
    onSubmit,
  });

  return (
    <Box backgroundColor="background" padding="xl" style={{ justifyContent: 'flex-end', flex: 1 }}>
      {!isKeyboardShown && (
        <Box style={{ flex: 1 }}>
          <Illustration width="100%" height="100%" />
        </Box>
      )}
      <Text variant="header">New Trip!</Text>
      <Text>Let's create a new trip</Text>
      <Box margin="s" />
      <TextInput
        label="Name"
        value={form.values.name}
        error={form.errors.name}
        onChangeText={setForm('name')}
        onBlur={validate}
      />
      <Box margin="s" />
      <Button title="create" onPress={handleSubmit} disabled={!isValid()} />
    </Box>
  );
};

export default NewTrip;
