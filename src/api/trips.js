import { authAxios } from './axios';

export const createTrip = (payload) => authAxios.post('/trips', payload);

export const getMyTrips = () => authAxios.get('/trips/mine');
