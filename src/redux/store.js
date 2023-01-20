import { configureStore } from '@reduxjs/toolkit';
import tripReducer from './slices/tripSlice';

const store = configureStore({
  reducer: { trip: tripReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
