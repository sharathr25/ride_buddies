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

const Trip = () => {
  const trip = useSelector(selectTrip);
  const { code, name, creation } = trip;
  const { by: organiser, on: createdOn } = creation;
  const { theme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { uid } = user || {};

  const dataPie = [
    { value: 100, stroke: '#DB3E00', strokeWidth: 10, title: 'John' },
    { value: 60, stroke: '#1273DE', strokeWidth: 10, title: 'Connor' },
    { value: 30, stroke: '#004DCF', strokeWidth: 10, title: 'Kyle' },
    { value: 20, stroke: '#5300EB', strokeWidth: 10, title: 'Reese' },
    { value: 10, stroke: '#417505', strokeWidth: 10, title: 'Sarah' },
  ];

  const icons = {
    CUSTOM: 'cog',
    SIGHTSEEING: 'binoculars',
    REFUELING: 'fuel',
    COFEE_BREAK: 'coffee',
    REPAIR: 'wrench',
    GOT_LOST: 'compass',
    PULL_OVER: 'police-badge',
  };

  return (
    <ScrollView>
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
                <Text style={{ marginLeft: 5 }}>Created by </Text>
                <Text style={{ fontWeight: 'bold' }}>{organiser.name}</Text>
                {organiser.uid === uid && (
                  <Text color="primary" variant="info" style={{ marginLeft: 'auto' }}>
                    You
                  </Text>
                )}
              </Box>
              <Box style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <Text style={{ marginLeft: 5 }}>On </Text>
                <Text style={{ fontWeight: 'bold' }}>
                  {format(new Date(createdOn), 'do MMM, yyyy')}
                </Text>
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
          <Box style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {Object.keys(icons).map((e) => (
              <Box
                key={e}
                style={{
                  flexDirection: 'row',
                  borderWidth: 2,
                  borderColor: theme.colors.foreground,
                  borderRadius: 100,
                  alignItems: 'center',
                }}
                margin="xs"
                padding="s"
              >
                <Icon name={icons[e]} size={16} />
                <Text style={{ marginHorizontal: 5 }}>
                  {`${(e.charAt(0).toUpperCase() + e.slice(1).toLowerCase()).replace('_', ' ')}`}
                </Text>
                <Text color="primary">0</Text>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Trip;
