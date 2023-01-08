import React, { useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OTP from './screens/OTP';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Profile from './screens/Profile';
import Header from './components/organisms/Header';
import { theme, darkTheme } from './theme';
import { ThemeContext } from './ThemeContext';
import EditProfile from './screens/EditProfile';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(useColorScheme() === 'dark');
  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkTheme.colors.background : theme.colors.background,
    flex: 1,
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: isDarkMode ? darkTheme : theme, toggleTheme, isDarkMode }}
    >
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeTabs" screenOptions={{ header: Header }}>
            <Stack.Screen name="HomeTabs" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
            <Stack.Screen name="OTP" component={OTP} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

export default App;
