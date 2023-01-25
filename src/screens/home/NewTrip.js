import React, { useState } from 'react';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import ApiStatusModal from '../../components/molecules/ApiStatusModal';
import useForm from '../../hooks/useForm';
import useKeyboard from '../../hooks/useKeyboard';
import { createTrip } from '../../api/trips';

import Illustration from '../../images/illustrations/trip.svg';

const NewTrip = ({ navigation }) => {
  const { isKeyboardShown } = useKeyboard();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const onValidate = ({ name }) => {
    const errors = {};
    if (name === '') errors.name = 'Name is required';
    return errors;
  };

  const onSubmit = async ({ name }) => {
    try {
      setLoading(true);
      const res = await createTrip({ name });
      navigation.push('Trip', res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { name: '' },
    onValidate,
    onSubmit,
  });

  const reportActionClick = () => {
    if (err) setErr(null);
    if (msg) setMsg(null);
  };

  return (
    <Box backgroundColor="background" padding="xl" style={{ justifyContent: 'flex-end', flex: 1 }}>
      <ApiStatusModal
        loading={loading}
        error={err}
        success={msg}
        reportActionClick={reportActionClick}
      />
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
