
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '@/types/user';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id' | 'isVerified' | 'createdAt'>) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true
  });

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('farmConnect_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('farmConnect_user');
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - in real app, this would call your backend API
      const mockUser: User = {
        id: '1',
        email,
        name: email === 'farmer@test.com' ? 'John Farmer' : 'Jane Consumer',
        role: email === 'farmer@test.com' ? 'farmer' : 'consumer',
        phone: '+880123456789',
        district: 'Dhaka',
        upazila: 'Dhanmondi',
        union: 'Ward-6',
        isVerified: true,
        createdAt: new Date()
      };

      localStorage.setItem('farmConnect_user', JSON.stringify(mockUser));
      setAuthState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  };

  const register = async (userData: Omit<User, 'id' | 'isVerified' | 'createdAt'>) => {
    try {
      // Mock registration - in real app, this would call your backend API
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        isVerified: false,
        createdAt: new Date()
      };

      localStorage.setItem('farmConnect_user', JSON.stringify(newUser));
      setAuthState({
        user: newUser,
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      console.error('Registration error:', error);
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('farmConnect_user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false
    });
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      if (!authState.user) throw new Error('No user logged in');

      const updatedUser = { ...authState.user, ...userData };
      localStorage.setItem('farmConnect_user', JSON.stringify(updatedUser));
      setAuthState(prev => ({
        ...prev,
        user: updatedUser
      }));
    } catch (error) {
      console.error('Profile update error:', error);
      throw new Error('Profile update failed');
    }
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
