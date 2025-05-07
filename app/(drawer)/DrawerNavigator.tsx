// drawer/DrawerNavigator.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AppStack from '../navigation/AppStack'; // Import the AppStack
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Employees"
        component={AppStack} // Use AppStack here
        options={{
          drawerIcon: () => <MaterialCommunityIcons name="account" size={24} />,
        }}
      />
      {/* Add other screens if necessary */}
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
