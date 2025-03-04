import { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function Index() {
  const { getItem } = useLocalStorage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await getItem('userAuth');
      if (user && user.isUserAuth) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return <Redirect href={isLoggedIn ? "/(tabs)" : "/login"} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});