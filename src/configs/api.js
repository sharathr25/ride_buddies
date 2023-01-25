export const API_URL =
  process.env.NODE_ENV !== 'development'
    ? 'http://192.168.29.232:3000'
    : 'https://rider-buddies-server.onrender.com';

export const SOCKET_URL =
  process.env.NODE_ENV !== 'development'
    ? 'ws://192.168.29.232:3000'
    : 'wss://rider-buddies-server.onrender.com';
