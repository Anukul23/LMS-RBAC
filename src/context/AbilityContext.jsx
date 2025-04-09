import React, { createContext, useContext, useState, useEffect } from 'react';
import { createAbilityForUser } from '../utils/abilityFactory';
import { useAuth } from './AuthContext';
import { AbilityBuilder, Ability } from '@casl/ability';

// Create a context for the ability
const AbilityContext = createContext(null);

// Create a default ability for unauthenticated users
const createDefaultAbility = () => {
  const { can, build } = new AbilityBuilder(Ability);
  // Add minimal permissions for unauthenticated users
  can('view', 'public');
  return build();
};

// Provider component that wraps the app and makes the ability available to any child component that calls useAbility()
export const AbilityProvider = ({ children }) => {
  const { user } = useAuth();
  const [ability, setAbility] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user && user.roles) {
      // Create a new ability based on the user's roles
      const userAbility = createAbilityForUser(user.roles);
      setAbility(userAbility);
    } else {
      // If no user or no roles, create a default ability
      setAbility(createDefaultAbility());
    }
    setIsLoading(false);
  }, [user]);

  // Show loading state only while we're initializing
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading permissions...</div>;
  }

  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

// Custom hook to use the ability context
export const useAbility = () => {
  const context = useContext(AbilityContext);
  if (!context) {
    throw new Error('useAbility must be used within an AbilityProvider');
  }
  return context;
}; 