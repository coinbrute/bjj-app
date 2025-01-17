// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

interface AuthContextProps {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  }
  
  export const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    login: async () => {},
    signup: async () => {},
    logout: async () => {},
  });
  
  export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    const login = async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
    };
  
    const signup = async (email: string, password: string) => {
      await createUserWithEmailAndPassword(auth, email, password);
    };
  
    const logout = async () => {
      await signOut(auth);
    };
  
    return (
      <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
        {children}
      </AuthContext.Provider>
    );
  };