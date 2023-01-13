import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Loader from '../../components/atoms/Loader';
import Button from '../../components/molecules/Button';
import ShareRoomCode from '../../components/molecules/ShareRoomCode';
import { ThemeContext } from '../../ThemeContext';
import useService from '../../hooks/useService';
import { getMyTrips } from '../../api/trips';

import ErrorIllustration from '../../images/illustrations/error.svg';

const Trips = ({ navigation }) => {
  const {
    data: trips,
    loading,
    error,
    refetch,
  } = useService({ initialData: [], service: getMyTrips });
  const { theme } = useContext(ThemeContext);

  if (loading)
    return (
      <Box
        backgroundColor="background"
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

  const renderItem = ({ item }) => {
    const { code, name } = item;

    const gotoTrip = () => {
      navigation.push('Trip', item);
    };

    return (
      <Box
        padding="l"
        margin="m"
        style={{ borderRadius: 10, backgroundColor: `${theme.colors.foreground}30` }}
      >
        <Box
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Text variant="subHeader">{name}</Text>
          <Box style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ShareRoomCode code={code} />
            <Box margin="m" />
            <Button leftIconName="chevron-right" size="xs" onPress={gotoTrip} />
          </Box>
        </Box>
      </Box>
    );
  };

  return (
    <Box backgroundColor="background" style={{ flex: 1 }}>
      <FlatList data={trips} renderItem={renderItem} keyExtractor={(item) => item._id} />
    </Box>
  );
};

export default Trips;
