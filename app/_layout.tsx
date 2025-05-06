import { Slot, useRouter } from 'expo-router';
import { AuthProvider, AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Layout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}

function MainLayout() {
  const { userToken, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      router.replace(userToken ? '/dashboard' : '/login');
    }
  }, [userToken, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Slot />;
}
