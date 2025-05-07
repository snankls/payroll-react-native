import React, { useContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router'; // ✅ Correct import
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const navigation = useNavigation();
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOption = async (option: string) => {
    setDropdownVisible(false);
    if (option === 'Logout') {
      await logout();
      router.replace('/login'); // ✅ Redirect after logout
    } else {
      console.log(`${option} selected`);
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>

      <Text style={styles.logo}>My App</Text>

      <TouchableOpacity onPress={toggleDropdown}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {dropdownVisible && (
        <View style={styles.dropdown}>
          <Pressable onPress={() => handleOption('Profile')}>
            <Text style={styles.dropdownItem}>Profile</Text>
          </Pressable>
          <Pressable onPress={() => handleOption('Logout')}>
            <Text style={styles.dropdownItem}>Logout</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  logo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 16,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    zIndex: 999,
    elevation: 4,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
});
