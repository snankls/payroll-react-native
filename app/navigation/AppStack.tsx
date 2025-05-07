// app/navigation/AppStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import EmployeesScreen from '../screens/employees/EmployeesScreen';
import ViewEmployeeScreen from '../screens/employees/ViewEmployeeScreen';
import EditEmployeeScreen from '../screens/employees/EditEmployeeScreen';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Employees" component={EmployeesScreen} />
      <Stack.Screen name="ViewEmployee" component={ViewEmployeeScreen} />
      <Stack.Screen name="EditEmployee" component={EditEmployeeScreen} />
    </Stack.Navigator>
  );
}