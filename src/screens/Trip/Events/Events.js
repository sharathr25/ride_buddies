import React, { useContext, useState } from 'react';
import { FlatList, Pressable } from 'react-native';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ThemeContext } from '../../../ThemeContext';
import Box from '../../../components/atoms/Box';
import Text from '../../../components/atoms/Text';
import Button from '../../../components/molecules/Button';
import Modal from '../../../components/molecules/Modal';
import TextInput from '../../../components/molecules/TextInput';
import Picker from '../../../components/molecules/Picker';
import ApiStatusModal from '../../../components/molecules/ApiStatusModal';
import Avatar from '../../../components/molecules/Avatar';
import { selectEvents, selectRidersMap } from '../../../redux/slices/tripSlice';
import useForm from '../../../hooks/useForm';
import { EVENT_TYPES } from '../../../constants';
import { sendDataToSocket } from '../../../api/socket';

import NoDataIllustration from '../../../images/illustrations/void.svg';
import Sightseeing from '../../../images/illustrations/sightseeing.svg';
import CofeeBreak from '../../../images/illustrations/coffee_break.svg';
import GotLost from '../../../images/illustrations/got_lost.svg';
import Police from '../../../images/illustrations/police.svg';
import Custom from '../../../images/illustrations/custom.svg';
import Repair from '../../../images/illustrations/towing.svg';
import Refueling from '../../../images/illustrations/city_driver.svg';

const illustrations = {
  [EVENT_TYPES.COFEE_BREAK]: CofeeBreak,
  [EVENT_TYPES.CUSTOM]: Custom,
  [EVENT_TYPES.GOT_LOST]: GotLost,
  [EVENT_TYPES.PULL_OVER]: Police,
  [EVENT_TYPES.REPAIR]: Repair,
  [EVENT_TYPES.COFEE_BREAK]: CofeeBreak,
  [EVENT_TYPES.REFUELING]: Refueling,
  [EVENT_TYPES.SIGHTSEEING]: Sightseeing,
};

const Events = () => {
  const { events, tripCode, ridersMap } = useSelector((state) => ({
    tripCode: state.trip.code,
    events: selectEvents(state),
    ridersMap: selectRidersMap(state),
  }));
  const { theme } = useContext(ThemeContext);
  const [showEventCreationForm, setShowEventCreationForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);

  const onValidate = ({ type, title }) => {
    const errors = {};
    if (type === EVENT_TYPES.CUSTOM && title === '')
      errors.title = 'Title is required for custom event';
    return errors;
  };

  const onSubmit = async ({ type, title }) => {
    try {
      setLoading(true);
      const data = await sendDataToSocket('ADD_EVENT', {
        tripCode,
        event: { type, title: type === EVENT_TYPES.CUSTOM ? title : '' },
      });
      setMsg(data.msg);
    } catch (error) {
      setMsg(error.error);
    } finally {
      setLoading(false);
    }
  };

  const { form, isValid, handleSubmit, setForm, validate } = useForm({
    initialValues: { type: EVENT_TYPES.CUSTOM, title: '' },
    onValidate,
    onSubmit,
  });

  const renderEvent = ({ item: event }) => {
    const expenseCreatedOn = new Date(event.on);
    const rider = ridersMap[event.by];

    const Illustration = illustrations[event.type] || <></>;

    return (
      <Pressable
        style={{
          backgroundColor: `${theme.colors.foreground}40`,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          padding: theme.spacing.s,
        }}
      >
        <Box style={{ flex: 0.15 }}>
          <Text>
            {format(expenseCreatedOn, 'd')}
            {'\n'}
            {format(expenseCreatedOn, 'MMM')}
            {'\n'}
            {format(expenseCreatedOn, 'yyyy')}
          </Text>
        </Box>
        <Box
          margin="s"
          style={{ width: 1, backgroundColor: `${theme.colors.foreground}40`, height: '75%' }}
        />
        <Box style={{ flex: 0.1 }}>
          <Text>
            {format(expenseCreatedOn, 'h')}
            {'\n'}
            {format(expenseCreatedOn, 'mm')}
            {'\n'}
            {format(expenseCreatedOn, 'a')}
          </Text>
        </Box>
        <Box
          margin="s"
          style={{ width: 1, backgroundColor: `${theme.colors.foreground}40`, height: '75%' }}
        />
        <Box style={{ flex: 0.75, zIndex: 1 }}>
          <Text variant="subHeader">{event.type.replace('_', ' ')}</Text>
          {event.title && <Text>{event.title}</Text>}
          <Box margin="xs" />
          <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar initial={rider.name.charAt(0)} backgroundColor={rider.color} />
            <Box margin="xs" />
            <Text variant="info">{rider.name}</Text>
          </Box>
        </Box>

        <Box
          style={{
            width: 80,
            height: 80,
            position: 'absolute',
            right: 0,
            bottom: 0,
            opacity: 0.5,
          }}
        >
          <Illustration width="100%" height="100%" />
        </Box>
      </Pressable>
    );
  };

  const reportActionClick = () => {
    if (err) setErr(null);
    if (msg) setMsg(null);
    setShowEventCreationForm(false);
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <ApiStatusModal
        loading={loading}
        error={err}
        success={msg}
        reportActionClick={reportActionClick}
      />
      {events.length === 0 ? (
        <Box style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <NoDataIllustration width="50%" height="50%" />
          <Text variant="subHeader">No Events</Text>
          <Box margin="s" />
        </Box>
      ) : (
        <FlatList
          initialScrollIndex={events.length - 1}
          data={events}
          keyExtractor={(item) => item.on}
          renderItem={renderEvent}
          ItemSeparatorComponent={<Box margin="s" />}
          ListHeaderComponent={() => (
            <Text variant="subHeader" style={{ marginBottom: 5 }}>
              Events
            </Text>
          )}
        />
      )}

      <Modal
        visible={showEventCreationForm}
        hideModal={() => setShowEventCreationForm(false)}
        header={<Text variant="subHeader">New event</Text>}
      >
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
      </Modal>

      <Box style={{ position: 'absolute', bottom: 20, right: 20 }}>
        <Button leftIconName="plus" onPress={() => setShowEventCreationForm(true)} size="m" />
      </Box>
    </Box>
  );
};

export default Events;
