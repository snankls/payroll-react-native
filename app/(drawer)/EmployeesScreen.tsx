import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { API_URL } from '@env';

const EmployeesScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${API_URL}/employees`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userToken) {
      fetchEmployees();
    }
  }, [userToken]);

  // Render individual employee data
  const renderEmployee = ({ item }: { item: any }) => (
    <View style={styles.row}>
      <Image source={{ uri: item.employee_image }} style={styles.image} />
      <Text style={styles.cell}>{item.code}</Text>
      <Text style={styles.cell}>{item.full_name}</Text>
      <Text style={styles.cell}>{item.gender}</Text>
      <Text style={styles.cell}>{item.department_name}</Text>
      <Text style={styles.cell}>{item.designation_name}</Text>
      <Text style={styles.cell}>{item.joining_date}</Text>
      <Text style={styles.cell}>{item.resign_date}</Text>
      <Text style={styles.cell}>{item.city_name}</Text>
      <Text style={styles.cell}>{item.total_salary}</Text>
      <Text style={styles.cell}>{item.status === 1 ? 'Active' : 'Inactive'}</Text>
      <Text style={styles.cell}>{item.created_by}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          {/* Table Header */}
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, styles.imageColumn]}>Image</Text>
            <Text style={styles.headerCell}>ID/Code</Text>
            <Text style={styles.headerCell}>Employee Name</Text>
            <Text style={styles.headerCell}>Gender</Text>
            <Text style={styles.headerCell}>Department</Text>
            <Text style={styles.headerCell}>Designation</Text>
            <Text style={styles.headerCell}>Joining Date</Text>
            <Text style={styles.headerCell}>Resign Date</Text>
            <Text style={styles.headerCell}>City</Text>
            <Text style={styles.headerCell}>Salary</Text>
            <Text style={styles.headerCell}>Status</Text>
            <Text style={styles.headerCell}>Created By</Text>
          </View>

          {/* Employee List */}
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEmployee}
          />
        </>
      )}
    </View>
  );
};

// Styles for Employee Screen
const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
  },
  headerCell: {
    fontWeight: 'bold',
    marginRight: 10,
    flex: 1,
  },
  imageColumn: {
    width: 50,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  cell: {
    marginRight: 10,
    flex: 1,
  },
});

export default EmployeesScreen;
