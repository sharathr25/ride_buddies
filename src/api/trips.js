import { authAxios } from './axios';

export const createTrip = (payload) => authAxios.post('/trips', payload);

export const getMyTrips = () => authAxios.get('/trips/mine');

export const getTripRiders = (tripId) => authAxios.get(`/trips/${tripId}/riders`);

export const getTripExpenses = (tripId) => authAxios.get(`/trips/${tripId}/expenses`);

export const getExpensesInDetail = (tripCode) =>
  authAxios.get(`/trips/${tripCode}/expensesDetails`);

export const getEventsCount = (tripCode) => authAxios.get(`/trips/${tripCode}/eventsCount`);

export const getTripEvents = (tripId) => authAxios.get(`/trips/${tripId}/events`);

export const joinTrip = (tripCode) => authAxios.put(`/trips/${tripCode}/join`);
