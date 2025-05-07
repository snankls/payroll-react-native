// app/screens/EditEmployeeScreen.tsx
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@env';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditEmployeeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { slug } = route.params;
  const { userToken } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    code: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    job_type_id: '',
    city_id: '',
    gender: 'Male',
    date_of_birth: '',
    joining_date: '',
    department_id: '',
    designation_id: '',
    basic_salary: '',
    house_rent: '',
    medical_allowances: '',
    total_salary: '',
    status: '1',
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${API_URL}/employee/${slug}`, {
          headers: { Authorization: `Bearer ${userToken}` }
        });
        
        const employee = response.data;
        setFormData({
          id: employee.id,
          code: employee.code,
          first_name: employee.first_name,
          last_name: employee.last_name,
          email: employee.email,
          phone_number: employee.phone_number,
          job_type_id: employee.job_type_id,
          city_id: employee.city_id,
          gender: employee.gender,
          date_of_birth: employee.date_of_birth,
          joining_date: employee.joining_date,
          department_id: employee.department_id.toString(),
          designation_id: employee.designation_id.toString(),
          basic_salary: employee.basic_salary,
          house_rent: employee.house_rent,
          medical_allowances: employee.medical_allowances,
          total_salary: employee.total_salary,
          status: employee.status.toString(),
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch employee data');
        console.error('Fetch error:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [slug, userToken]);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      // Convert string numbers back to numbers where needed
      const payload = {
        ...formData,
        department_id: Number(formData.department_id),
        designation_id: Number(formData.designation_id),
        basic_salary: Number(formData.basic_salary),
        house_rent: Number(formData.house_rent),
        medical_allowances: Number(formData.medical_allowances),
        total_salary: Number(formData.total_salary),
        status: Number(formData.status),
      };

      const response = await axios.post(`${API_URL}/employees`, payload, {
        headers: { 
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      Alert.alert('Success', 'Employee updated successfully');
      navigation.goBack();
      // Optionally refresh the employee list by passing a callback
    } catch (error) {
      console.error('Update error:', error.response?.data || error.message);
      Alert.alert(
        'Error', 
        error.response?.data?.message || 
        error.response?.data?.errors?.join('\n') || 
        'Failed to update employee'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Edit Employee: {formData.first_name} {formData.last_name}</Text>

        <TextInput
            style={styles.input}
            value={formData.id}
            onChangeText={(text) => setFormData({...formData, id: text})}
          />
      
      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Employee Code *</Text>
          <TextInput
            style={styles.input}
            value={formData.code}
            onChangeText={(text) => setFormData({...formData, code: text})}
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>First Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.first_name}
            onChangeText={(text) => setFormData({...formData, first_name: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last Name *</Text>
          <TextInput
            style={styles.input}
            value={formData.last_name}
            onChangeText={(text) => setFormData({...formData, last_name: text})}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email *</Text>
          <TextInput
            style={styles.input}
            value={formData.email}
            onChangeText={(text) => setFormData({...formData, email: text})}
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <TextInput
            style={styles.input}
            value={formData.phone_number}
            onChangeText={(text) => setFormData({...formData, phone_number: text})}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputGroup}>
        <Text style={styles.label}>Job Tyep *</Text>
        <TextInput
            style={styles.input}
            value={formData.job_type_id}
            onChangeText={(text) => setFormData({...formData, job_type_id: text})}
            keyboardType="phone-pad"
        />
        </View>

        <View style={styles.inputGroup}>
        <Text style={styles.label}>City *</Text>
        <TextInput
            style={styles.input}
            value={formData.city_id}
            onChangeText={(text) => setFormData({...formData, city_id: text})}
            keyboardType="phone-pad"
        />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity 
              style={[styles.radioButton, formData.gender === 'Male' && styles.radioSelected]}
              onPress={() => setFormData({...formData, gender: 'Male'})}
            >
              <Text>Male</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.radioButton, formData.gender === 'Female' && styles.radioSelected]}
              onPress={() => setFormData({...formData, gender: 'Female'})}
            >
              <Text>Female</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={formData.date_of_birth}
            onChangeText={(text) => setFormData({...formData, date_of_birth: text})}
            placeholder="YYYY-MM-DD"
          />
        </View>
      </View>

      {/* Employment Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employment Details</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Joining Date *</Text>
          <TextInput
            style={styles.input}
            value={formData.joining_date}
            onChangeText={(text) => setFormData({...formData, joining_date: text})}
            placeholder="YYYY-MM-DD"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Department ID *</Text>
          <TextInput
            style={styles.input}
            value={formData.department_id}
            onChangeText={(text) => setFormData({...formData, department_id: text})}
            keyboardType="numeric"
            placeholder="Enter department ID"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Designation ID *</Text>
          <TextInput
            style={styles.input}
            value={formData.designation_id}
            onChangeText={(text) => setFormData({...formData, designation_id: text})}
            keyboardType="numeric"
            placeholder="Enter designation ID"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.radioGroup}>
            <TouchableOpacity 
              style={[styles.radioButton, formData.status === '1' && styles.radioSelected]}
              onPress={() => setFormData({...formData, status: '1'})}
            >
              <Text>Active</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.radioButton, formData.status === '0' && styles.radioSelected]}
              onPress={() => setFormData({...formData, status: '0'})}
            >
              <Text>Inactive</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Salary Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Salary Information</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Basic Salary *</Text>
          <TextInput
            style={styles.input}
            value={formData.basic_salary}
            onChangeText={(text) => setFormData({...formData, basic_salary: text})}
            keyboardType="numeric"
            placeholder="Enter basic salary"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>House Rent</Text>
          <TextInput
            style={styles.input}
            value={formData.house_rent}
            onChangeText={(text) => setFormData({...formData, house_rent: text})}
            keyboardType="numeric"
            placeholder="Enter house rent"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Medical Allowances</Text>
          <TextInput
            style={styles.input}
            value={formData.medical_allowances}
            onChangeText={(text) => setFormData({...formData, medical_allowances: text})}
            keyboardType="numeric"
            placeholder="Enter medical allowances"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Total Salary</Text>
          <TextInput
            style={styles.input}
            value={formData.total_salary}
            onChangeText={(text) => setFormData({...formData, total_salary: text})}
            keyboardType="numeric"
            placeholder="Calculated total salary"
            editable={false}
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.saveButton} 
        onPress={handleUpdate}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.saveButtonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  radioGroup: {
    flexDirection: 'row',
    marginTop: 5,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#f5f5f5',
  },
  radioSelected: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loader: {
    marginTop: 20,
  },
});

export default EditEmployeeScreen;