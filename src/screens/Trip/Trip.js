import React from 'react';
import { ScrollView } from 'react-native';
import { format } from 'date-fns';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import useAuth from '../../hooks/useAuth';
import ShareRoomCode from '../../components/molecules/ShareRoomCode';

const Trip = ({ trip }) => {
  const { code, name, riders, creation } = trip;
  const { by: organiser, on: createdOn } = creation;
  const { user } = useAuth();
  const { uid } = user || {};

  const renderRider = (rider, i) => (
    <Box style={{ alignItems: 'center', marginHorizontal: 5 }} key={i}>
      <Avatar initial={rider.name[0]} backgroundColor={rider.color} />
      {user.uid === rider.uid && (
        <Text variant="info" color="success">
          (You)
        </Text>
      )}
    </Box>
  );

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Text variant="header">{name}</Text>
      <ShareRoomCode code={code} />
      <Box margin="m" />
      <Box>
        <Text variant="subHeader">Organiser</Text>
        <Box margin="xs" />
        <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Avatar initial={organiser.name[0]} backgroundColor={organiser.color} />
          <Box>
            <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ marginLeft: 5 }}>Created by </Text>
              <Text style={{ fontWeight: 'bold' }}>{organiser.name}</Text>
              {organiser.uid === uid && (
                <Text color="success" variant="info">
                  (You)
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
    </Box>
  );
};

export default Trip;
