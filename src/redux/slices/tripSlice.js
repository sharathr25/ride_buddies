import { createSlice } from '@reduxjs/toolkit';

const tripSlice = createSlice({
  name: 'trip',
  initialState: {},
  reducers: {
    addExpense: (state, action) => ({ ...state, expenses: [...state.expenses, action.payload] }),
    updateExpense: (state, action) => ({
      ...state,
      expenses: state.expenses.map((e) =>
        e._id === action.payload._id ? { ...e, ...action.payload } : e
      ),
    }),
    updateExpensesAsSeen: (state, action) => ({
      ...state,
      expenses: state.expenses.map((e) =>
        action.payload.includes(e._id) ? { ...e, seen: true } : e
      ),
    }),
    updateEventsAsSeen: (state, action) => ({
      ...state,
      events: state.events.map((e) => (action.payload.includes(e._id) ? { ...e, seen: true } : e)),
    }),
    removeExpense: (state, action) => ({
      ...state,
      expenses: state.expenses.filter((e) => e._id !== action.payload),
    }),
    addEvent: (state, action) => ({ ...state, events: [...state.events, action.payload] }),
    updateEvent: (state, action) => ({
      ...state,
      events: state.events.map((e) =>
        e._id === action.payload._id ? { ...e, ...action.payload } : e
      ),
    }),
    removeEvent: (state, action) => ({
      ...state,
      events: state.events.filter((e) => e._id !== action.payload),
    }),
    updateLocation: (state, action) => ({
      ...state,
      riders: state.riders.map((r) =>
        r.uid === action.payload.uid ? { ...r, location: action.payload.coords } : r
      ),
    }),
    set: (state, action) => ({
      ...state,
      ...action.payload,
      ridersMap: action.payload.riders.reduce((acc, cur) => ({ ...acc, [cur.uid]: cur }), {}),
    }),
    reset: () => {},
  },
});

export const {
  set,
  reset,
  addExpense,
  removeExpense,
  updateExpense,
  addEvent,
  updateEvent,
  removeEvent,
  updateLocation,
  updateExpensesAsSeen,
  updateEventsAsSeen,
} = tripSlice.actions;

export const selectTrip = (state) => state.trip;

export const selectRiders = (state) => state.trip?.riders || [];

export const selectRidersMap = (state) => state.trip?.ridersMap || {};

export const selectExpenses = (state) => state.trip?.expenses || [];

export const selectEvents = (state) => state.trip?.events || [];

export default tripSlice.reducer;
