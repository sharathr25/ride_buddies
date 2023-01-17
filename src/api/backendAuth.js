import { publicAxios } from './axios';

export const getUserByPhoneNumber = (phoneNumber) => publicAxios.get(`/auth/${phoneNumber}`);
