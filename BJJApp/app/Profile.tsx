import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/AuthContext'; // Import AuthContext

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, loading, logout } = useContext(AuthContext); // Use Context

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/'); // Redirect to Home after logout
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0a7ea4" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No user data available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      {/* Add more user info here as needed */}
      <Button title="Logout" onPress={handleLogout} color="#d9534f" />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '700',
    color: '#0a7ea4',
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
});