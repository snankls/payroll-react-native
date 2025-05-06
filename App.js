//import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        {/* <AppNavigator /> */}
      </NavigationContainer>
    </AuthProvider>
  );
}
