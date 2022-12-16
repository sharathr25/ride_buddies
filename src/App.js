import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import OTP from './screens/OTP';
import Home from './screens/Home';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import { theme, darkTheme } from './theme';
import { ThemeContext } from './ThemeContext';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? darkTheme.colors.background : theme.colors.background,
    flex: 1,
  };

  return (
    <ThemeContext.Provider value={isDarkMode ? darkTheme : theme}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <NativeRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/otp" element={<OTP />} />
          </Routes>
        </NativeRouter>
      </SafeAreaView>
    </ThemeContext.Provider>
  );
};

export default App;
