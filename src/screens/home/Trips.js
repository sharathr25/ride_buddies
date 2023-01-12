import React from 'react';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import { getMyTrips } from '../../api/trips';
import useService from '../../hooks/useService';
import Loader from '../../components/atoms/Loader';

const Trips = () => {
  const { data: trips, loading, error } = useService({ initialData: [], service: getMyTrips });

  console.log(trips, loading, error);

  if (true)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Loader />
      </Box>
    );

  return (
    <Box backgroundColor="background">
      <Text>Trips</Text>
    </Box>
  );
};

export default Trips;
