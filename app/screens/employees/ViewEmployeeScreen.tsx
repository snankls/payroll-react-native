import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { AuthContext } from '../../context/AuthContext';

const ViewEmployeeScreen = ({ route }) => {
  const { slug } = route.params;
  const { userToken } = useContext(AuthContext);
  const [employee, setEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_URL}/employee/${slug}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });
        
        if (!response.data) {
          throw new Error('Employee data not found');
        }
        
        setEmployee(response.data);
      } catch (err) {
        console.error('Error fetching employee:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch employee');
      } finally {
        setLoading(false);
      }
    };

    if (slug && userToken) {
      fetchEmployee();
    }
  }, [slug, userToken]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: 'red' }}>Error: {error}</Text>
        <Text>Requested slug: {slug}</Text>
      </View>
    );
  }

  if (!employee) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Employee not found.</Text>
        <Text>Requested slug: {slug}</Text>
        <Text>Expected slug: abrar-akram</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: employee.employee_image }} style={styles.image} />
      <Text style={styles.label}>Full Name:</Text>
      <Text style={styles.value}>{employee.full_name}</Text>
      <Text style={styles.label}>Code:</Text>
      <Text style={styles.value}>{employee.code}</Text>
      <Text style={styles.label}>Gender:</Text>
      <Text style={styles.value}>{employee.gender}</Text>
      <Text style={styles.label}>Department:</Text>
      <Text style={styles.value}>{employee.department_name}</Text>
      <Text style={styles.label}>Designation:</Text>
      <Text style={styles.value}>{employee.designation_name}</Text>
      <Text style={styles.label}>Joining Date:</Text>
      <Text style={styles.value}>{employee.joining_date}</Text>
      <Text style={styles.label}>Resign Date:</Text>
      <Text style={styles.value}>{employee.resign_date}</Text>
      <Text style={styles.label}>City:</Text>
      <Text style={styles.value}>{employee.city_name}</Text>
      <Text style={styles.label}>Salary:</Text>
      <Text style={styles.value}>{employee.total_salary}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.value}>{employee.status === 1 ? 'Active' : 'Inactive'}</Text>
      <Text style={styles.label}>Created By:</Text>
      <Text style={styles.value}>{employee.created_by}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ViewEmployeeScreen;
