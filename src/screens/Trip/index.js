import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Trip from './Trip';
import Expenses from './Expenses';
import Riders from './Riders';
import Messages from './Messages';
import Map from './Map';
import Icon from '../../components/atoms/Icon';
import { ThemeContext } from '../../ThemeContext';

const Tab = createBottomTabNavigator();

const ICONS_FOR_ROUTES = {
  Details: 'details',
  Riders: 'bike-fast',
  Map: 'map',
  Expences: 'clipboard-list',
  Messages: 'chat',
};

const TripTabs = ({ route }) => {
  const { theme } = useContext(ThemeContext);

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
      <Tab.Screen name="Details">{() => <Trip trip={route.params} />}</Tab.Screen>
      <Tab.Screen name="Riders">{() => <Riders tripId={route.params._id} />}</Tab.Screen>
      <Tab.Screen name="Map">{() => <Map tripId={route.params._id} />}</Tab.Screen>
      <Tab.Screen name="Expences">{() => <Expenses tripId={route.params._id} />}</Tab.Screen>
      <Tab.Screen name="Messages">{() => <Messages tripId={route.params._id} />}</Tab.Screen>
    </Tab.Navigator>
  );
};

export default TripTabs;
