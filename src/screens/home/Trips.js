import React, { useContext } from 'react';
import { FlatList, Pressable } from 'react-native';
import format from 'date-fns/format';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Loader from '../../components/atoms/Loader';
import Button from '../../components/molecules/Button';
import { ThemeContext } from '../../ThemeContext';
import useService from '../../hooks/useService';
import useAuth from '../../hooks/useAuth';
import { getMyTrips } from '../../api/trips';

import ErrorIllustration from '../../images/illustrations/error.svg';
import NoDataIllustration from '../../images/illustrations/void.svg';

const Trips = ({ navigation }) => {
  const { user } = useAuth();
  const { uid } = user || {};
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
        <Button rightIconName="refresh" size="xs" onPress={refetch} />
      </Box>
    );
  }

  const renderItem = ({ item }) => {
    const { code, name, creation } = item;
    const createdOn = new Date(creation.on);

    const gotoTrip = () => {
      navigation.push('Trip', item);
    };

    return (
      <Pressable
        style={{
          backgroundColor: `${theme.colors.foreground}40`,
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          padding: theme.spacing.s,
        }}
        onPress={gotoTrip}
      >
        <Box style={{ flex: 0.12 }}>
          <Text>
            {format(createdOn, 'd')}
            {'\n'}
            {format(createdOn, 'MMM')}
            {'\n'}
            {format(createdOn, 'yyyy')}
          </Text>
        </Box>
        <Box
          margin="s"
          style={{ width: 1, backgroundColor: `${theme.colors.foreground}40`, height: '75%' }}
        />
        <Box style={{ flex: 0.88 }}>
          <Text variant="subHeader">{name}</Text>
          <Box
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box>
              <Text>{code}</Text>
              {uid === item.creation.by.uid && <Text color="success">You're the organizer</Text>}
            </Box>
          </Box>
        </Box>
      </Pressable>
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
        <Button rightIconName="refresh" size="xs" onPress={refetch} />
      </Box>
    );

  return (
    <Box backgroundColor="background" style={{ flex: 1 }} padding="l">
      <FlatList
        data={trips}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        ItemSeparatorComponent={<Box margin="s" />}
        ListHeaderComponent={
          <Text
            variant="subHeader"
            style={{ marginBottom: 5, backgroundColor: theme.colors.background }}
          >
            Trips
          </Text>
        }
        stickyHeaderIndices={[0]}
      />
    </Box>
  );
};

export default Trips;
