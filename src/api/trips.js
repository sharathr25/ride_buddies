import { authAxios } from './axios';

export const createTrip = (payload) => authAxios.post('/trips', payload);
