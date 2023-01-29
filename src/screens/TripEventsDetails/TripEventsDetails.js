import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import Loader from '../../components/atoms/Loader';
import { ThemeContext } from '../../ThemeContext';
import { capitalize } from '../../utils/formators';
import { getEventsCount } from '../../api/trips';
import useService from '../../hooks/useService';

import ErrorIllustration from '../../images/illustrations/error.svg';
import VoidIllustration from '../../images/illustrations/void.svg';

const icons = {
  CUSTOM: 'cog',
  SIGHTSEEING: 'binoculars',
  REFUELING: 'fuel',
  COFFEE_BREAK: 'coffee',
  REPAIR: 'wrench',
  GOT_LOST: 'compass',
  PULL_OVER: 'police-badge',
};

const TripEventsDetails = () => {
  const { tripCode } = useSelector((state) => ({ tripCode: state.trip.code }));
  const { theme } = useContext(ThemeContext);
  const {
    data: eventsCount,
    loading,
    error,
    refetch,
  } = useService({
    initialData: null,
    service: getEventsCount,
    serviceParams: tripCode,
  });

  if (!eventsCount)
    return (
      <Box
        backgroundColor="background"
        padding="l"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <VoidIllustration width="50%" height="50%" />
        <Text>No Events</Text>
      </Box>
    );

  if (loading)
    return (
      <Box
        backgroundColor="background"
        padding="l"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Loader />
      </Box>
    );

  if (error)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <ErrorIllustration width="50%" height="50%" />
        <Text color="danger" variant="subHeader">
          Something went wrong!
        </Text>
        <Box margin="s" />
        <Button rightIconName="refresh" size="xs" onPress={refetch} />
      </Box>
    );

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Box margin="m" />
      <Text variant="subHeader">Overview of Events</Text>
      <Box margin="xs" />
      {Object.keys(eventsCount).map((event) => (
        <Box
          key={event}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: `${theme.colors.foreground}40`,
          }}
          margin="xs"
          padding="s"
        >
          <Icon name={icons[event]} size={16} />
          <Text style={{ marginHorizontal: 5 }}>{capitalize(event).replace('_', ' ')}</Text>
          <Text color="success">{eventsCount[event]}</Text>
        </Box>
      ))}
    </Box>
  );
};

export default TripEventsDetails;
