import { io } from 'socket.io-client';
import { SOCKET_URL } from '../configs/api';
import { getIdToken } from './auth';

let socket = null;

export const connectSocket = () => {
  return new Promise((resolve, reject) => {
    socket = io(SOCKET_URL, {
      reconnectionDelayMax: 10000,
      auth: {
        token: getIdToken(),
      },
      transports: ['websocket', 'polling'],
      secure: false,
      reconnectionAttempts: 10,
      handshake: true,
    });

    socket.io.on('error', (error) => {
      console.error('Connection ERROR', error);
      reject(error);
    });

    // socket.io.on('ping', () => {
    //   console.log('Ping OK');
    // });

    socket.io.on('reconnect_attempt', (attempt) => {
      console.log(`Reconnecting ${attempt}`);
    });

    socket.io.on('reconnect', () => {
      console.log('Reconnection OK');
    });

    socket.io.on('reconnect_error', (error) => {
      console.error('Reconnection ERROR', error);
    });

    socket.io.on('reconnect_failed', () => {
      console.error('Reconnection FAILED');
    });

    socket.on('connect', () => {
      console.log('Connected');
      resolve(true);
    });

    socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      if (reason === 'io client disconnect') {
        console.log('Disconnected');
      }
      // else the socket will automatically try to reconnect
    });
  });
};

export const disconnectSocket = () => {
  return new Promise((resolve) => {
    socket.disconnect();
    socket.on('disconnect', () => {
      resolve(true);
      console.log('Disconnected');
      socket = null;
    });
  });
};

export const joinTrip = (tripCode) => {
  return new Promise((resolve) => {
    socket.emit('join', tripCode, (response) => {
      console.log(`Joined Trip ${tripCode}`);
      resolve(response);
    });
  });
};

export const sendDataToSocket = (eventName, data) => {
  return new Promise((resolve, reject) => {
    console.log(`sending event ${eventName}`);
    socket.emit(eventName, data, (response) => {
      if ('error' in response) reject(response);
      else resolve(response);
    });
  });
};

export const listenEvent = (eventName, callBack) => {
  console.log(eventName);
  socket.on(eventName, callBack);
};
