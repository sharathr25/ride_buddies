const isDev = process.env.NODE_ENV === 'development';
// const isDev = false;

export const API_URL = isDev
  ? 'http://192.168.29.232:3000'
  : 'https://rider-buddies-server.onrender.com';

export const SOCKET_URL = isDev
  ? 'ws://192.168.29.232:3000'
  : 'wss://rider-buddies-server.onrender.com';
