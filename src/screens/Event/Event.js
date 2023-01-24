import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import Button from '../../components/molecules/Button';
import { selectEvents, selectRidersMap } from '../../redux/slices/tripSlice';
import { sendDataToSocket } from '../../api/socket';
import { EVENT_TYPES } from '../../constants';

import Sightseeing from '../../images/illustrations/sightseeing.svg';
import CofeeBreak from '../../images/illustrations/coffee_break.svg';
import GotLost from '../../images/illustrations/got_lost.svg';
import Police from '../../images/illustrations/police.svg';
import Custom from '../../images/illustrations/custom.svg';
import Repair from '../../images/illustrations/towing.svg';
import Refueling from '../../images/illustrations/city_driver.svg';
import ApiStatusModal from '../../components/molecules/ApiStatusModal';

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

const Event = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [msg, setMsg] = useState(null);
  const { events, ridersMap, tripCode } = useSelector((state) => ({
    tripCode: state.trip.code,
    events: selectEvents(state),
    ridersMap: selectRidersMap(state),
  }));
  const { eventId } = route.params;
  const event = events.find((e) => e._id === eventId);

  const deleteEvent = async () => {
    try {
      setLoading(true);
      const data = await sendDataToSocket('DELETE_EVENT', { eventId, tripCode });
      setMsg(data.msg);
    } catch (error) {
      setErr(error.error);
    } finally {
      setLoading(false);
    }
  };

  const gotoUpdateEventScreen = () => {
    navigation.push('EventForm', { eventId });
  };

  const reportActionClick = () => {
    if (err) setErr(null);
    if (msg) setMsg(null);
    navigation.goBack();
  };

  const renderEventDetails = () => {
    if (!event) return null;

    const expenseCreatedOn = new Date(event.on);
    const rider = ridersMap[event.by];
    const Illustration = illustrations[event.type] || <></>;

    return (
      <>
        <Box style={{ flex: 0.9 }}>
          <Illustration width="100%" height="100%" />
        </Box>
        <Text variant="subHeader">{event.type.replace('_', ' ')}</Text>
        {event.title && <Text>{event.title}</Text>}

        <Box margin="xs" />

        <Box style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text bold>On</Text>
          <Text style={{ textAlign: 'right' }}>
            {format(expenseCreatedOn, 'h : mm a')}
            {'\n'}
            {format(expenseCreatedOn, 'd MMM yyyy')}
          </Text>
        </Box>

        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text bold>By</Text>
          <Box style={{ flex: 1 }} />
          <Avatar initial={rider.name.charAt(0)} backgroundColor={rider.color} />
          <Box margin="xs" />
          <Text>{rider.name}</Text>
        </Box>

        <Box margin="s" />

        <Box style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Button title="delete" outline color="danger" onPress={deleteEvent} />
          <Box margin="s" />
          <Button title="edit" onPress={gotoUpdateEventScreen} />
        </Box>
      </>
    );
  };

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <ApiStatusModal
        loading={loading}
        error={err}
        success={msg}
        reportActionClick={reportActionClick}
      />
      {renderEventDetails()}
    </Box>
  );
};

export default Event;
