import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { AuthContext } from './context/AuthContext';
import { API_URL } from '@env';

export default function LoginScreen() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const token = response.data.data.authorisation.token;
      const userData = response.data.data.user;

      await login(token, userData);
      router.replace('/dashboard');
    } catch (error: any) {
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Login failed. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} autoCapitalize="none" />

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />

      <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />

      {message ? <Text style={{ color: 'red', marginTop: 10 }}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'center' },
  label: { marginBottom: 4, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
