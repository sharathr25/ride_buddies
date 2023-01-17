import React from 'react';
import { FlatList } from 'react-native';
import { getTripEvents } from '../../api/trips';
import Box from '../../components/atoms/Box';
import Loader from '../../components/atoms/Loader';
import Text from '../../components/atoms/Text';
import Button from '../../components/molecules/Button';
import useService from '../../hooks/useService';

import ErrorIllustration from '../../images/illustrations/error.svg';
import NoDataIllustration from '../../images/illustrations/void.svg';

const Events = ({ tripId }) => {
  const { data, loading, error, refetch } = useService({
    initialData: [],
    service: getTripEvents,
    serviceParams: tripId,
  });
  const { events } = data;

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

  if (!events) return null;

  if (events.length === 0)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <NoDataIllustration width="50%" height="50%" />
        <Text variant="subHeader">No Events</Text>
        <Box margin="s" />
        <Button leftIconName="refresh" size="xs" onPress={refetch} />
      </Box>
    );

  const renderMessage = ({ item: message }) => null;

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.uid}
        renderItem={renderMessage}
        ListHeaderComponent={() => (
          <Text variant="subHeader" style={{ marginBottom: 5 }}>
            Messages
          </Text>
        )}
      />
    </Box>
  );
};

export default Events;
