import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import Settings from './Settings';
import Icon from '../../components/atoms/Icon';
import HomeHeader from '../../components/organisms/HomeHeader';
import { ThemeContext } from '../../ThemeContext';
import Groups from './Groups';
import NewGroup from './NewGroup';
import Notifications from './Notifications';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color, size }) => {
            let iconName = 'chevrons-left';

            if (route.name === 'Main') iconName = 'home';
            if (route.name === 'Groups') iconName = 'users';
            if (route.name === 'New Group') iconName = 'plus-circle';
            if (route.name === 'Notifications') iconName = 'bell';
            if (route.name === 'Settings') iconName = 'settings';

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.darkGray,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopWidth: 0,
            elevation: 0,
          },
          header: ({ navigation, route }) => {
            if (route.name === 'Main') return <HomeHeader navigation={navigation} />;
            return null;
          },
        };
      }}
    >
      <Tab.Screen name="Main" component={Home} />
      <Tab.Screen name="Groups" component={Groups} />
      <Tab.Screen name="New Group" component={NewGroup} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
