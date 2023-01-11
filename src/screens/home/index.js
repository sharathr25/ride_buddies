import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Settings from './Settings';
import Icon from '../../components/atoms/Icon';
import HomeHeader from '../../components/organisms/HomeHeader';
import { ThemeContext } from '../../ThemeContext';
import Trips from './Trips';
import NewTrip from './NewTrip';
import Notifications from './Notifications';

const Tab = createBottomTabNavigator();

const ICONS_FOR_ROUTES = {
  Home: 'home',
  Trips: 'users',
  'New Trip': 'plus-circle',
  Notifications: 'bell',
  Settings: 'settings',
};

const HomeTabs = () => {
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
          header: ({ navigation, route }) => {
            if (route.name === 'Home') return <HomeHeader navigation={navigation} />;
            return null;
          },
        };
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Trips" component={Trips} />
      <Tab.Screen name="New Trip" component={NewTrip} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
