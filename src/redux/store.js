import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice';
import locationReducer from './slices/locationSlice';

const store = configureStore({
  reducer: { trip: tripReducer, location: locationReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
