import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import Text from '../../components/atoms/Text';
import TextInput from '../../components/molecules/TextInput';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import useAuth from '../../hooks/useAuth';
import useForm from '../../hooks/useForm';
// import { INDIA_COUNTRY_CODE } from '../../constants';
import { validateMobileNumber } from '../../utils/validators';

const NewTrip = () => {
  const { user } = useAuth();
  const [riderMobileNums, setRiderMobileNums] = useState([user.phoneNumber.slice(-10)]);

  const onValidate = ({ name }) => {
    const errors = {};
    if (name === '') errors.name = 'Name is required';
    riderMobileNums.forEach((mn, i) => {
      const err = validateMobileNumber(mn);
      if (err) errors[`riderMobileNumErr${i}`] = err;
    });
    return errors;
  };

  const onSubmit = async (values) => {
    console.log(values, riderMobileNums);
  };

  const { form, setForm, isValid, validate, handleSubmit } = useForm({
    initialValues: { name: '' },
    onValidate,
    onSubmit,
  });

  const handlePlusClick = () => {
    setRiderMobileNums((prev) => [...prev, '']);
  };

  const handleChange = (index) => (value) => {
    setRiderMobileNums((prev) => {
      const prevCopy = [...prev];
      prevCopy[index] = value;
      return prevCopy;
    });
  };

  const handleMinusClick = (index) => () => {
    setRiderMobileNums((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    validate();
  };

  return (
    <Box
      backgroundColor="background"
      padding="xl"
      style={{ justifyContent: 'flex-start', flex: 1 }}
    >
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
      <Text variant="subHeader">Riders</Text>
      <ScrollView>
        {riderMobileNums.map((value, index) => (
          <Box key={index}>
            <TextInput
              label={`Rider ${index + 1} Mobile Number${index === 0 ? '(YOU)' : ''}`}
              value={value}
              error={form.errors[`riderMobileNumErr${index}`]}
              onChangeText={handleChange(index)}
              onBlur={validate}
              editable={index !== 0}
            />
            {index !== 0 && (
              <Box style={{ position: 'absolute', right: 5, top: 10 }}>
                <Button
                  outline
                  leftIconName="minus"
                  onPress={handleMinusClick(index)}
                  color="danger"
                />
              </Box>
            )}
          </Box>
        ))}
        <Box style={{ alignSelf: 'flex-end', marginRight: 5 }}>
          <Button outline leftIconName="plus" onPress={handlePlusClick} />
        </Box>
      </ScrollView>
      <Box margin="s" />
      <Box style={{ marginTop: 'auto' }}>
        <Button title="create" onPress={handleSubmit} disabled={!isValid()} />
      </Box>
    </Box>
  );
};

export default NewTrip;
