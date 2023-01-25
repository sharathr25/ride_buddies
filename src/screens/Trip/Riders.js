import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Avatar from '../../components/molecules/Avatar';
import useAuth from '../../hooks/useAuth';
import { selectRiders } from '../../redux/slices/tripSlice';

const Riders = () => {
  const { user } = useAuth();
  const { uid } = user;
  const riders = useSelector(selectRiders);

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
      <Box margin="m" />
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
