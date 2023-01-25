import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Icon from '../../components/atoms/Icon';
import { useSelector } from 'react-redux';
import { selectLocation } from '../../redux/slices/locationSlice';
import { selectRiders } from '../../redux/slices/tripSlice';

const INDIA_COORDS = [78.9629, 20.5937];

const Map = () => {
  const { myLocation, riders } = useSelector((state) => ({
    myLocation: selectLocation(state),
    riders: selectRiders(state),
  }));

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      region={{
        longitude: myLocation[0] || INDIA_COORDS[0],
        latitude: myLocation[1] || INDIA_COORDS[1],
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {riders.map((r, index) => {
        if (r.location.length === 0) return null;

        const [longitude, latitude] = r.location;
        return (
          <Marker
            key={index}
            coordinate={{ longitude: longitude || 0, latitude: latitude || 0 }}
            title={r.name}
          >
            <Icon name="map-marker" size={30} color={r.color} />
          </Marker>
        );
      })}
    </MapView>
  );
};

export default Map;
