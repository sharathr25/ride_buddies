import React from 'react';
import { FlatList } from 'react-native';
import { getTripRiders } from '../../api/trips';
import Box from '../../components/atoms/Box';
import Loader from '../../components/atoms/Loader';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import Button from '../../components/molecules/Button';
import useAuth from '../../hooks/useAuth';
import useService from '../../hooks/useService';

import ErrorIllustration from '../../images/illustrations/error.svg';

const Riders = ({ tripId }) => {
  const { user } = useAuth();
  const { uid } = user;
  const { data, loading, error, refetch } = useService({
    initialData: [],
    service: getTripRiders,
    serviceParams: tripId,
  });
  const { riders } = data;

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

  if (error) {
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
        <Button leftIconName="refresh" size="xs" onPress={refetch} />
      </Box>
    );
  }

  if (!riders) return null;

  const renderRider = ({ item: rider }) => (
    <Box style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
      <Avatar initial={rider.name[0]} backgroundColor={rider.color} />
      <Text style={{ marginLeft: 5 }}>{rider.name}</Text>
      {rider.uid === uid && (
        <Text color="success" variant="info" style={{ marginLeft: 'auto' }}>
          You
        </Text>
      )}
    </Box>
  );

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <FlatList
        data={riders}
        keyExtractor={(item) => item.uid}
        renderItem={renderRider}
        ListHeaderComponent={() => (
          <Text variant="subHeader" style={{ marginBottom: 5 }}>
            Riders
          </Text>
        )}
      />
    </Box>
  );
};

export default Riders;
