import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Button from '../../components/molecules/Button';
import TextInput from '../../components/molecules/TextInput';
import Picker from '../../components/molecules/Picker';
import useForm from '../../hooks/useForm';
import { EVENT_TYPES } from '../../constants';
import { sendDataToSocket } from '../../api/socket';
import ApiStatusModal from '../../components/molecules/ApiStatusModal';
import { selectEvents } from '../../redux/slices/tripSlice';
import { selectLocation } from '../../redux/slices/locationSlice';

const EventForm = ({ navigation, route }) => {
  const { eventId } = route.params || {};
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const { tripCode, events, myLocation } = useSelector((state) => ({
    tripCode: state.trip.code,
    events: selectEvents(state),
    myLocation: selectLocation(state),
  }));

  const event = events.find((e) => e._id === eventId) || {};

  const onValidate = ({ type, title }) => {
    const errors = {};
    if (type === EVENT_TYPES.CUSTOM && title === '')
      errors.title = 'Title is required for custom event';
    return errors;
  };

  const onSubmit = async ({ type, title }) => {
    try {
      setLoading(true);
      const data = await sendDataToSocket(eventId ? 'UPDATE_EVENT' : 'ADD_EVENT', {
        tripCode,
        event: {
          type,
          title: type === EVENT_TYPES.CUSTOM ? title : '',
          _id: event._id,
          location: myLocation,
        },
      });
      setMsg(data.msg);
    } catch (error) {
      setErr(error.error);
    } finally {
      setLoading(false);
    }
  };

  const { form, isValid, handleSubmit, setForm, validate } = useForm({
    initialValues: { type: event.type || EVENT_TYPES.CUSTOM, title: event.title || '' },
    onValidate,
    onSubmit,
  });

  const reportActionClick = () => {
    if (err) setErr(null);
    if (msg) setMsg(null);
    navigation.goBack();
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <ApiStatusModal
        loading={loading}
        error={err}
        success={msg}
        reportActionClick={reportActionClick}
      />
      <Picker
        options={Object.values(EVENT_TYPES).map((et) => ({
          value: et,
          label: et.replace('_', ' '),
        }))}
        label="type"
        selectedValue={form.values.type}
        onValueChange={setForm('type')}
      />
      <Box margin="s" />
      {form.values.type === EVENT_TYPES.CUSTOM && (
        <TextInput
          label="title"
          value={form.values.title}
          onChangeText={setForm('title')}
          onBlur={validate}
          error={form.errors.title}
        />
      )}
      <Box style={{ alignItems: 'flex-end' }}>
        <Button title="done" onPress={handleSubmit} disabled={!isValid()}></Button>
      </Box>
    </Box>
  );
};

export default EventForm;
