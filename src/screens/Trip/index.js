import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trip from './Trip';
import Expenses from './Expenses';
import Riders from './Riders';
import Events from './Events';
import Map from './Map';
import Icon from '../../components/atoms/Icon';
import Box from '../../components/atoms/Box';
import Loader from '../../components/atoms/Loader';
import Text from '../../components/atoms/Text';
import { ThemeContext } from '../../ThemeContext';
import { connectSocket, disconnectSocket, joinTrip, listenEvent } from '../../api/socket';
import {
  addEvent,
  addExpense,
  removeEvent,
  removeExpense,
  reset,
  set,
  updateEvent,
  updateExpense,
} from '../../redux/slices/tripSlice';

import ErrorIllustration from '../../images/illustrations/error.svg';
import NoDataIllustration from '../../images/illustrations/void.svg';

const Tab = createBottomTabNavigator();

const ICONS_FOR_ROUTES = {
  Information: 'information-outline',
  Riders: 'bike-fast',
  Map: 'map',
  Expences: 'clipboard-list',
  Events: 'calendar-clock-outline',
};

const TripTabs = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const trip = useSelector(({ trip }) => trip);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const joinTripGroup = async () => {
    try {
      setLoading(true);

      await connectSocket();
      const response = await joinTrip(route.params.code);

      dispatch(set(response));

      listenEvent('EXPENSE_ADDED', (expense) => {
        dispatch(addExpense(expense));
      });

      listenEvent('EXPENSE_UPDATED', (expense) => {
        dispatch(updateExpense(expense));
      });

      listenEvent('EXPENSE_DELETED', (expenseId) => {
        dispatch(removeExpense(expenseId));
      });

      listenEvent('EVENT_ADDED', (event) => {
        dispatch(addEvent(event));
      });

      listenEvent('EVENT_UPDATED', (event) => {
        dispatch(updateEvent(event));
      });

      listenEvent('EVENT_DELETED', (eventId) => {
        dispatch(removeEvent(eventId));
      });
    } catch (error) {
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    joinTripGroup();
    return () => {
      disconnectSocket();
      dispatch(reset());
    };
  }, []);

  if (loading)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Loader />
      </Box>
    );

  if (err) {
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <ErrorIllustration width="50%" height="50%" />
        <Text color="danger" variant="subHeader">
          Something went wrong!
        </Text>
        <Box margin="s" />
      </Box>
    );
  }

  if (Object.keys(trip).length === 0)
    return (
      <Box
        backgroundColor="background"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <NoDataIllustration width="50%" height="50%" />
        <Text color="danger" variant="subHeader">
          No Details
        </Text>
        <Box margin="s" />
      </Box>
    );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color, size }) => (
            <Icon name={ICONS_FOR_ROUTES[route.name] || 'minus'} size={size} color={color} />
          ),
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.darkGray,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 0,
            elevation: 0,
          },
          tabBarHideOnKeyboard: true,
          headerShown: false,
        };
      }}
    >
      <Tab.Screen name="Information" component={Trip} />
      <Tab.Screen name="Riders" component={Riders} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Expences" component={Expenses} />
      <Tab.Screen name="Events" component={Events} />
    </Tab.Navigator>
  );
};

export default TripTabs;
