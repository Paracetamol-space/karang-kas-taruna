import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  role: 'guest' | 'admin';
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hardcoded admin credentials for demo
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'karangtaruna123'
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>({
    id: 'guest',
    role: 'guest',
    name: 'Guest'
  });

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setUser({
        id: 'admin',
        role: 'admin',
        name: 'Administrator'
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser({
      id: 'guest',
      role: 'guest',
      name: 'Guest'
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAdmin: user?.role === 'admin'
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