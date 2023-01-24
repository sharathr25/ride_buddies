import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import DonutChart from '../../components/molecules/DonutChart';
import Avatar from '../../components/molecules/Avatar';
import ShareRoomCode from '../../components/molecules/ShareRoomCode';
import useAuth from '../../hooks/useAuth';
import { ThemeContext } from '../../ThemeContext';
import { selectTrip } from '../../redux/slices/tripSlice';
import { capitalize } from '../../utils/formators';

import NoDataIllustration from '../../images/illustrations/void.svg';

const Trip = () => {
  const trip = useSelector(selectTrip);
  const { code, name, creation, expensesGrouped, eventsGrouped, ridersMap } = trip;
  const { by: organiser, on: createdOn } = creation;
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { uid } = user || {};

  const dataPie = expensesGrouped.map((e) => ({
    value: e.amount,
    stroke: ridersMap[e._id].color,
    strokeWidth: 10,
    title: ridersMap[e._id].name,
  }));

  const icons = {
    CUSTOM: 'cog',
    SIGHTSEEING: 'binoculars',
    REFUELING: 'fuel',
    COFEE_BREAK: 'coffee',
    REPAIR: 'wrench',
    GOT_LOST: 'compass',
    PULL_OVER: 'police-badge',
  };

  const renderEvents = () => {
    if (eventsGrouped.length === 0)
      return (
        <Box style={{ justifyContent: 'center', alignItems: 'center' }}>
          <NoDataIllustration width="100%" height={100} />
          <Box margin="s" />
          <Text>No events</Text>
        </Box>
      );

    return (
      <Box style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {eventsGrouped.map(({ _id: event, count }) => (
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
            <Text color="success">{count}</Text>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
        <Text variant="header">{name}</Text>
        <ShareRoomCode code={code} />

        <Box margin="m" />

        <Box>
          <Text variant="subHeader">Organiser</Text>
          <Box margin="xs" />
          <Box
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box style={{ flex: 0.1 }}>
              <Avatar initial={organiser.name[0]} backgroundColor={organiser.color} />
            </Box>
            <Box style={{ flex: 0.85 }}>
              <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ marginLeft: 5 }} bold>
                  Created by
                </Text>
                <Text> {organiser.name}</Text>
                {organiser.uid === uid && (
                  <Text color="success" style={{ marginLeft: 'auto' }}>
                    You
                  </Text>
                )}
              </Box>
              <Box style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={{ marginLeft: 5 }} bold>
                  On
                </Text>
                <Text> {format(new Date(createdOn), 'dd MMM yyyy')}</Text>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box margin="m" />

        <Box>
          <Text variant="subHeader">Total Expenses</Text>
          <DonutChart data={dataPie} size={200} />
        </Box>

        <Box>
          <Text variant="subHeader">Overview of Events</Text>
          <Box margin="xs" />
          {renderEvents()}
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Trip;
