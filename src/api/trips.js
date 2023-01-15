import { authAxios } from './axios';

export const createTrip = (payload) => authAxios.post('/trips', payload);

export const getMyTrips = () => authAxios.get('/trips/mine');

export const getTripRiders = (tripId) => authAxios.get(`/trips/${tripId}/riders`);

export const getTripExpenses = (tripId) => authAxios.get(`/trips/${tripId}/expenses`);

export const getTripMessages = (tripId) => authAxios.get(`/trips/${tripId}/messages`);

export const joinTrip = (tripCode) => authAxios.put(`/trips/${tripCode}/join`);
