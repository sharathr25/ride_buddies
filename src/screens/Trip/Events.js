import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import { selectEvents } from '../../redux/slices/tripSlice';

import NoDataIllustration from '../../images/illustrations/void.svg';

const Events = () => {
  const events = useSelector(selectEvents);

  if (events.length === 0)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <NoDataIllustration width="50%" height="50%" />
        <Text variant="subHeader">No Events</Text>
        <Box margin="s" />
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
