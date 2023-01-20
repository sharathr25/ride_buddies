import React, { useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import Landing from './screens/Landing';
import OTP from './screens/OTP';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import TermsOfUse from './screens/TermsOfUse';
import PrivacyPolicy from './screens/PrivacyPolicy';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import Trip from './screens/Trip';
import Header from './components/organisms/Header';
import { theme, darkTheme } from './theme';
import { ThemeContext } from './ThemeContext';
import useAuth from './hooks/useAuth';
import store from './redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  const { user } = useAuth();
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
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={user ? 'HomeTabs' : 'Landing'}
              screenOptions={{ header: Header }}
            >
              <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
              <Stack.Screen name="HomeTabs" component={Home} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignIn} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
              <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
              <Stack.Screen name="OTP" component={OTP} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Trip" component={Trip} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

export default App;
