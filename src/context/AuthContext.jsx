import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem('user');
    console.log('Stored user from localStorage:', storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log('Parsed user:', parsedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
        // Set default admin user if parsing fails
        const defaultUser = {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          roles: ['ADMIN']
        };
        console.log('Setting default admin user after parse error:', defaultUser);
        setUser(defaultUser);
        localStorage.setItem('user', JSON.stringify(defaultUser));
      }
    } else {
      // No user in localStorage, set default admin user
      const defaultUser = {
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        roles: ['ADMIN']
      };
      console.log('Setting default admin user (no stored user):', defaultUser);
      setUser(defaultUser);
      localStorage.setItem('user', JSON.stringify(defaultUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Ensure user has at least one role
    const userWithRoles = {
      ...userData,
      roles: userData.roles || ['USER'], // Default to USER role if no roles specified
    };
    console.log('Logging in user:', userWithRoles);
    setUser(userWithRoles);
    localStorage.setItem('user', JSON.stringify(userWithRoles));
  };

  const logout = () => {
    console.log('Logging out user');
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const hasRole = (role) => {
    const hasRole = user && user.roles && user.roles.includes(role);
    console.log(`Checking if user has role ${role}:`, hasRole, 'User:', user);
    return hasRole;
  };

  const hasAnyRole = (roles) => {
    const hasAny = user && user.roles && roles.some(role => user.roles.includes(role));
    console.log(`Checking if user has any roles ${roles}:`, hasAny, 'User:', user);
    return hasAny;
  };

  const hasAllRoles = (roles) => {
    const hasAll = user && user.roles && roles.every(role => user.roles.includes(role));
    console.log(`Checking if user has all roles ${roles}:`, hasAll, 'User:', user);
    return hasAll;
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const contextValue = {
    user,
    login,
    logout,
    isAuthenticated,
    hasRole,
    hasAnyRole,
    hasAllRoles
  };

  console.log('AuthContext current value:', contextValue);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 