import React, { useContext } from 'react';
import { StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { AuthContext } from '@/context/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { user, loading, logout } = useContext(AuthContext);

  const navigateToAuth = () => {
    router.push('/AuthModal');
  };

  const navigateToProfile = () => {
    router.push('/Profile');
  };

  if (loading) {
    return (
      <ThemedView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </ThemedView>
    );
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <HelloWave />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome to BJJ App!</ThemedText>
        {user && <ThemedText style={styles.welcomeText}>Hello, {user.email}!</ThemedText>}
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        {user ? (
          <>
            <Button title="Go to Profile" onPress={navigateToProfile} color="#0a7ea4" />
            <Button title="Logout" onPress={logout} color="#d9534f" />
          </>
        ) : (
          <>
            <Button title="Login" onPress={navigateToAuth} color="#0a7ea4" />
            <Button title="Sign Up" onPress={navigateToAuth} color="#5cb85c" />
          </>
        )}
      </ThemedView>

      {/* You can retain the existing steps or remove them as per your design */}
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Welcome to the BJJ App</ThemedText>
        <ThemedText>
          Use the buttons above to login or sign up and access your profile.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 18,
    color: '#333',
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});