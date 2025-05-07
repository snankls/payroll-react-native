import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './app/context/AuthContext';  // Import the AuthContext provider
import Layout from './app/(drawer)/_layout';  // Import the layout component that contains your navigators

export default function App() {
  return (
    <AuthProvider>  {/* Wrap your app with AuthProvider */}
      <NavigationContainer>
        <Layout />  {/* The main layout for your app */}
      </NavigationContainer>
    </AuthProvider>
  );
}
