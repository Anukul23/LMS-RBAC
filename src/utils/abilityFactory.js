import { AbilityBuilder, Ability } from '@casl/ability';
import { RoleHierarchy, RolePermissions, Subjects, Actions } from '../config/permissions';

/**
 * Get all inherited roles for a given role
 * @param {string} role - The role to get inherited roles for
 * @returns {string[]} - Array of roles including the given role and all inherited roles
 */
const getInheritedRoles = (role) => {
  const roles = [role];
  
  // Get direct inherited roles
  const inheritedRoles = RoleHierarchy[role] || [];
  
  // Recursively get inherited roles for each inherited role
  inheritedRoles.forEach(inheritedRole => {
    const nestedInheritedRoles = getInheritedRoles(inheritedRole);
    roles.push(...nestedInheritedRoles);
  });
  
  // Remove duplicates
  return [...new Set(roles)];
};

/**
 * Get all permissions for a given role including inherited permissions
 * @param {string} role - The role to get permissions for
 * @returns {Object} - Object containing all permissions for the role and its inherited roles
 */
const getAllPermissionsForRole = (role) => {
  const inheritedRoles = getInheritedRoles(role);
  const allPermissions = {};
  
  // Combine permissions from all inherited roles
  inheritedRoles.forEach(inheritedRole => {
    const rolePermissions = RolePermissions[inheritedRole] || {};
    
    // For each subject in the role permissions
    Object.keys(rolePermissions).forEach(subject => {
      if (!allPermissions[subject]) {
        allPermissions[subject] = [];
      }
      
      // Add permissions for this subject
      allPermissions[subject] = [...new Set([...allPermissions[subject], ...rolePermissions[subject]])];
    });
  });
  
  return allPermissions;
};

/**
 * Create a CASL ability for a given role
 * @param {string} role - The role to create an ability for
 * @returns {Ability} - CASL ability instance
 */
export const createAbilityForRole = (role) => {
  const { can, build } = new AbilityBuilder(Ability);
  const permissions = getAllPermissionsForRole(role);
  
  // Define rules for each subject and its actions
  Object.keys(permissions).forEach(subject => {
    permissions[subject].forEach(action => {
      can(action, subject);
    });
  });
  
  return build();
};

/**
 * Create a CASL ability for a user with multiple roles
 * @param {string[]} roles - Array of roles the user has
 * @returns {Ability} - CASL ability instance
 */
export const createAbilityForUser = (roles = []) => {
  const { can, build } = new AbilityBuilder(Ability);

  // If user has no roles, return empty ability
  if (!roles || roles.length === 0) {
    return build();
  }

  // Special handling for ADMIN role
  if (roles.includes('ADMIN')) {
    // Grant all permissions to admin
    can('manage', 'all');
    // Explicitly add role management permissions
    can(Actions.CREATE_ROLE, Subjects.ROLE);
    can(Actions.EDIT_ROLE, Subjects.ROLE);
    can(Actions.DELETE_ROLE, Subjects.ROLE);
    can(Actions.ASSIGN_ROLE, Subjects.USER);
    return build();
  }

  // For each role, add its permissions
  roles.forEach(role => {
    const permissions = RolePermissions[role] || {};
    
    // Define rules for each subject and its actions
    Object.keys(permissions).forEach(subject => {
      permissions[subject].forEach(action => {
        can(action, subject);
      });
    });
  });
  
  return build();
}; 