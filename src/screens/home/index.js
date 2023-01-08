import React, { useContext } from 'react';
import Home from './Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../../components/atoms/Icon';
import { ThemeContext } from '../../ThemeContext';
import HomeHeader from '../../components/organisms/HomeHeader';

const Tab = createBottomTabNavigator();

const HomeTabs = () => {
  const theme = useContext(ThemeContext);

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color, size }) => {
            let iconName = 'chevrons-left';

            if (route.name === 'Main') {
              iconName = 'home';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.darkGray,
          tabBarLabel: '',
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
    </Tab.Navigator>
  );
};

export default HomeTabs;
