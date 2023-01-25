import React from 'react';
import { useSelector } from 'react-redux';
import Box from '../../components/atoms/Box';
import Text from '../../components/atoms/Text';
import Icon from '../../components/atoms/Icon';
import { selectLocation } from '../../redux/slices/locationSlice';

const Map = () => {
  const location = useSelector(selectLocation);
  const [long, lat] = location;

  return (
    <Box backgroundColor="background" padding="l" style={{ flex: 1 }}>
      <Text>Map</Text>
      <Text>
        {long}, {lat}
      </Text>
      {!long && (
        <Box
          backgroundColor="danger"
          style={{
            position: 'absolute',
            width: '200%',
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          padding="s"
        >
          <Icon name="map-marker" size={16} />
          <Box margin="xs" />
          <Text>Location not available</Text>
        </Box>
      )}
    </Box>
  );
};

export default Map;
