import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from '../components/Header';

import DashboardScreen from './DashboardScreen';
import EmployeesScreen from './EmployeesScreen';
import SettingsScreen from './SettingsScreen';

const Drawer = createDrawerNavigator();

export default function Layout() {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        header: () => <Header />,
      }}
    >
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Employees" component={EmployeesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
