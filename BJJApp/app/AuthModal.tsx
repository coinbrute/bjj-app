import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '@/context/AuthContext'; // Import AuthContext

const AuthModal: React.FC = () => {
  const router = useRouter();
  const { login, signup } = useContext(AuthContext); // Use Context
  const [isLogin, setIsLogin] = useState<boolean>(true); // Toggle between Login and Signup
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      router.back(); // Close modal on success
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
        />
        <Button title={isLogin ? "Login" : "Sign Up"} onPress={handleAuth} />
        <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
          <Text style={styles.toggleText}>
            {isLogin ? "Don't have an account? Sign Up" : "Have an account? Login"}
          </Text>
        </TouchableOpacity>
        <Button title="Close" onPress={() => router.back()} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  innerContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    elevation: 5, // for Android
    shadowColor: '#000', // for iOS
    shadowOffset: { width: 0, height: 2 }, // for iOS
    shadowOpacity: 0.25, // for iOS
    shadowRadius: 3.84, // for iOS
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderColor: '#999',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  toggleText: {
    color: 'blue',
    marginTop: 15,
    textAlign: 'center',
  },
});