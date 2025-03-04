import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Login() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Login</ThemedText>
      <Link href="/(tabs)">View details</Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });