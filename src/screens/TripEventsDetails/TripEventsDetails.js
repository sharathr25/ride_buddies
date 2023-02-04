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
import { EVENT_TYPES } from '../../constants/index';

import ErrorIllustration from '../../images/illustrations/error.svg';
import VoidIllustration from '../../images/illustrations/void.svg';
import Sightseeing from '../../images/illustrations/sightseeing.svg';
import CoffeeBreak from '../../images/illustrations/coffee_break.svg';
import GotLost from '../../images/illustrations/got_lost.svg';
import Police from '../../images/illustrations/police.svg';
import Custom from '../../images/illustrations/custom.svg';
import Repair from '../../images/illustrations/towing.svg';
import Refueling from '../../images/illustrations/city_driver.svg';

const illustrations = {
  [EVENT_TYPES.CUSTOM]: Custom,
  [EVENT_TYPES.GOT_LOST]: GotLost,
  [EVENT_TYPES.PULL_OVER]: Police,
  [EVENT_TYPES.REPAIR]: Repair,
  [EVENT_TYPES.COFFEE_BREAK]: CoffeeBreak,
  [EVENT_TYPES.REFUELING]: Refueling,
  [EVENT_TYPES.SIGHTSEEING]: Sightseeing,
};

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
      <Text variant="subHeader">Number of different events</Text>
      <Box margin="xs" />
      {Object.keys(eventsCount).map((event) => {
        const Illustration = illustrations[event] || <></>;

        return (
          <Box
            key={event}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: `${theme.colors.foreground}40`,
              height: 80,
            }}
            margin="xs"
            padding="s"
          >
            <Icon name={icons[event]} size={16} />
            <Text style={{ marginHorizontal: 5 }}>{capitalize(event).replace('_', ' ')}</Text>
            <Text color="success" variant="header">
              {eventsCount[event]}
            </Text>
            <Box
              style={{
                width: 80,
                height: 80,
                position: 'absolute',
                right: 0,
                bottom: 0,
              }}
            >
              <Illustration width="100%" height="100%" />
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default TripEventsDetails;
