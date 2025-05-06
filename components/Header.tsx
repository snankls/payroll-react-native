import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Header() {
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOption = (option: string) => {
    console.log(`${option} selected`);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.header}>
      {/* Left: Hamburger */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name="menu" size={28} color="#333" />
      </TouchableOpacity>

      {/* Center: Logo */}
      <Text style={styles.logo}>My App</Text>

      {/* Right: User Image */}
      <TouchableOpacity onPress={toggleDropdown}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/300' }}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Dropdown */}
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
