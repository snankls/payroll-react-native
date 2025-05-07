// screens/EmployeesScreen.tsx
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, ActivityIndicator, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';
//import { MaterialCommunityIcons } from 'react-native-vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { API_URL } from '@env';

const EmployeesScreen = ({ navigation }) => {
  const { userToken } = useContext(AuthContext);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const handleView = (employee) => {
    // Use employee.slug instead of the parameter
    navigation.navigate('ViewEmployee', { slug: employee.slug });
  };

  const handleEdit = (employee) => {
    navigation.navigate('EditEmployee', { slug: employee.slug });
  };

  const handleDelete = async (employee) => {
    try {
      setDeletingId(employee.id);
      const response = await axios.delete(`${API_URL}/employees/${employee.id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200 || response.status === 204) {
        await fetchEmployees();
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDeletingId(null);
    }
  };
  
  // const handleDelete = async (employee) => {
  //   Alert.alert(
  //     'Confirm Deletion',
  //     `Are you sure you want to permanently delete ${employee.full_name}?`,
  //     [
  //       {
  //         text: 'Cancel',
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Delete',
  //         style: 'destructive',
  //         onPress: async () => {
  //           try {
  //             setDeletingId(employee.slug);
              
  //             const response = await axios.delete(`${API_URL}/employees/${employee.slug}`, {
  //               headers: {
  //                 Authorization: `Bearer ${userToken}`,
  //                 'Content-Type': 'application/json',
  //               },
  //             });
  
  //             if (response.status === 200) {
  //               // Refresh the list
  //               await fetchEmployees();
                
  //               Alert.alert(
  //                 'Deleted',
  //                 `${employee.full_name} has been deleted successfully`,
  //                 [{ text: 'OK', onPress: () => {} }]
  //               );
  //             }
  //           } catch (error) {
  //             let errorMessage = 'Failed to delete employee';
              
  //             if (error.response) {
  //               // Server responded with error status (4xx, 5xx)
  //               errorMessage = error.response.data?.message || 
  //                            error.response.data?.error || 
  //                            errorMessage;
  //             } else if (error.request) {
  //               // Request was made but no response received
  //               errorMessage = 'No response from server';
  //             }
              
  //             Alert.alert('Error', errorMessage);
  //           } finally {
  //             setDeletingId(null);
  //           }
  //         },
  //       },
  //     ],
  //     { cancelable: false }
  //   );
  // };

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

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <DataTable>
          {/* Table Header */}
          <DataTable.Header>
            <DataTable.Title>Image</DataTable.Title>
            <DataTable.Title>ID/Code</DataTable.Title>
            <DataTable.Title>Employee Name</DataTable.Title>
            <DataTable.Title>Gender</DataTable.Title>
            <DataTable.Title>Department</DataTable.Title>
            <DataTable.Title>Designation</DataTable.Title>
            <DataTable.Title>Joining Date</DataTable.Title>
            <DataTable.Title>Resign Date</DataTable.Title>
            <DataTable.Title>City</DataTable.Title>
            <DataTable.Title>Salary</DataTable.Title>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Created By</DataTable.Title>
            <DataTable.Title>Action</DataTable.Title>
          </DataTable.Header>

          {/* Table Rows */}
          {employees.map((item) => (
            <DataTable.Row key={item.id}>
              <DataTable.Cell>
                <Image source={{ uri: item.employee_image }} style={styles.image} />
              </DataTable.Cell>
              <DataTable.Cell>{item.code}</DataTable.Cell>
              <DataTable.Cell>{item.full_name}</DataTable.Cell>
              <DataTable.Cell>{item.gender}</DataTable.Cell>
              <DataTable.Cell>{item.department_name}</DataTable.Cell>
              <DataTable.Cell>{item.designation_name}</DataTable.Cell>
              <DataTable.Cell>{item.joining_date}</DataTable.Cell>
              <DataTable.Cell>{item.resign_date}</DataTable.Cell>
              <DataTable.Cell>{item.city_name}</DataTable.Cell>
              <DataTable.Cell>{item.total_salary}</DataTable.Cell>
              <DataTable.Cell>{item.status === 1 ? 'Active' : 'Inactive'}</DataTable.Cell>
              <DataTable.Cell>{item.created_by}</DataTable.Cell>
              <DataTable.Cell style={styles.actionCell}>
                {/* View Button */}
                <TouchableOpacity onPress={() => handleView(item)} style={styles.iconButton}>
                  <MaterialCommunityIcons name="eye" size={24} color="green" />
                </TouchableOpacity>

                {/* Edit Button */}
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.iconButton}>
                  <MaterialCommunityIcons name="pencil" size={24} color="blue" />
                </TouchableOpacity>

                {/* Delete Button - wrapped in View with padding */}
                <TouchableOpacity onPress={() => handleDelete(item)} style={styles.iconButton}>
    <MaterialCommunityIcons name="delete" size={24} color="red" />
  </TouchableOpacity>


              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  actionCell: {
    flexDirection: 'row',
  },
});

export default EmployeesScreen;
