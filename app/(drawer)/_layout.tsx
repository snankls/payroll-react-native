// app/(drawer)/_layout.tsx
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Header from '../components/Header';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import AppStack from '../navigation/AppStack'; // Import the Stack Navigator

import DashboardScreen from './DashboardScreen';
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
      <Drawer.Screen 
        name="Employees" 
        component={AppStack}
        options={{
          drawerIcon: () => <MaterialCommunityIcons name="account" size={24} />
        }}
      />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
    </Drawer.Navigator>
  );
}



// import React from 'react';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import Header from '../components/Header';

// import DashboardScreen from './DashboardScreen';
// import EmployeesScreen from '../screens/EmployeesScreen';
// import SettingsScreen from './SettingsScreen';

// const Drawer = createDrawerNavigator();

// export default function Layout() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Dashboard"
//       screenOptions={{
//         header: () => <Header />,
//       }}
//     >
//       <Drawer.Screen name="Dashboard" component={DashboardScreen} />
//       <Drawer.Screen name="Employees" component={EmployeesScreen} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//     </Drawer.Navigator>
//   );
// }
