import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import Header from '../components/Header';  // Adjust import as necessary

const Drawer = createDrawerNavigator();

function DashboardScreen() {
  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  );
}

function EmployeesScreen() {
  return (
    <View>
      <Text>Employees</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

export default function Layout() {
  return (
    <Drawer.Navigator initialRouteName="Dashboard" screenOptions={{
      header: () => <Header />,
    }}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      <Drawer.Screen name="Employees" component={EmployeesScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}
