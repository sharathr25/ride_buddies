import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Loader from '../../components/atoms/Loader';
import Button from '../../components/molecules/Button';
import ShareRoomCode from '../../components/molecules/ShareRoomCode';
import { ThemeContext } from '../../ThemeContext';
import useService from '../../hooks/useService';
import useAuth from '../../hooks/useAuth';
import { getMyTrips } from '../../api/trips';

import ErrorIllustration from '../../images/illustrations/error.svg';
import NoDataIllustration from '../../images/illustrations/void.svg';

const Trips = ({ navigation }) => {
  const { user } = useAuth();
  const { uid } = user;
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
        <Text variant="subHeader">{name}</Text>
        <Box margin="s" />
        <Box
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Box>
            <ShareRoomCode code={code} />
            {uid === item.creation.by.uid && <Text color="success">You're the organizer</Text>}
          </Box>
          <Button leftIconName="arrow-right" size="s" onPress={gotoTrip} />
        </Box>
      </Box>
    );
  };

  if (!trips) return null;

  if (trips.length === 0)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <NoDataIllustration width="50%" height="50%" />
        <Text variant="subHeader">No Trips</Text>
        <Box margin="s" />
        <Button leftIconName="refresh" size="xs" onPress={refetch} />
      </Box>
    );

  return (
    <Box backgroundColor="background" style={{ flex: 1 }}>
      <FlatList data={trips} renderItem={renderItem} keyExtractor={(item) => item._id} />
    </Box>
  );
};

export default Trips;
