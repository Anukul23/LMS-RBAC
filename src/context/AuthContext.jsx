import { createContext, useContext, useState, useEffect } from 'react';
import { RolePermissions } from '../config/permissions';

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
        // Ensure the user has valid roles and permissions
        const validatedUser = validateAndFixUser(parsedUser);
        setUser(validatedUser);
        // Update localStorage with validated user
        localStorage.setItem('user', JSON.stringify(validatedUser));
      } catch (error) {
        console.error('Error parsing user data from localStorage:', error);
        localStorage.removeItem('user');
        setDefaultAdminUser();
      }
    } else {
      setDefaultAdminUser();
    }
    setLoading(false);
  }, []);

  const validateAndFixUser = (userData) => {
    // Ensure user has valid roles array
    const roles = Array.isArray(userData.roles) ? userData.roles : ['USER'];
    
    // Determine permissions based on roles
    let permissions = RolePermissions.USER;
    if (roles.includes('ADMIN')) {
      permissions = RolePermissions.ADMIN;
    }

    return {
      ...userData,
      roles,
      permissions
    };
  };

  const setDefaultAdminUser = () => {
    const defaultUser = {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      roles: ['ADMIN'],
      permissions: RolePermissions.ADMIN
    };
    console.log('Setting default admin user:', defaultUser);
    setUser(defaultUser);
    localStorage.setItem('user', JSON.stringify(defaultUser));
  };

  const login = (userData) => {
    // Validate and fix user data before setting
    const validatedUser = validateAndFixUser(userData);
    console.log('Logging in user with validated data:', validatedUser);
    setUser(validatedUser);
    localStorage.setItem('user', JSON.stringify(validatedUser));
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

  const hasPermission = (action, subject) => {
    const hasPermission = user?.permissions?.[subject]?.includes(action);
    console.log(`Checking if user has permission ${action} on ${subject}:`, hasPermission);
    return hasPermission;
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
    hasAllRoles,
    hasPermission
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