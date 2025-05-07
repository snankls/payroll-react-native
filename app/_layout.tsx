import { Slot, useRouter } from 'expo-router';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import Header from './components/Header';

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

  return (
    <View style={{ flex: 1 }}>
      {userToken && (
        <View style={{ zIndex: 1, elevation: 4 }}>
        </View>
      )}
      <View style={{ flex: 1, zIndex: 0 }}>
        <Slot />
      </View>
    </View>
  );
}
