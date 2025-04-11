import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAbility } from '../../context/AbilityContext';

// Create a context for the permission

/**
 * Component that renders its children only if the user has the specified role
 * @param {Object} props - Component props
 * @param {string|string[]} props.roles - Role or array of roles required to view the content
 * @param {boolean} props.all - If true, user must have all roles. If false, user must have any role.
 * @param {React.ReactNode} props.children - Children to render if the user has the required role(s)
 * @param {React.ReactNode} props.fallback - Optional fallback content to render if the user doesn't have the required role(s)
 */
export const RequireRole = ({ roles, all = false, children, fallback = null }) => {
  const { hasAnyRole, hasAllRoles } = useAuth();
  
  // Convert single role to array
  const roleArray = Array.isArray(roles) ? roles : [roles];
  
  // Check if user has the required role(s)
  const hasRequiredRoles = all ? hasAllRoles(roleArray) : hasAnyRole(roleArray);
  
  if (!hasRequiredRoles) {
    return fallback;
  }
  
  return <>{children}</>;
};

/**
 * Component that renders its children only if the user has permission to perform the specified action on the specified subject
 * @param {Object} props - Component props
 * @param {string} props.action - Action to check permission for
 * @param {string} props.subject - Subject to check permission for
 * @param {React.ReactNode} props.children - Children to render if the user has permission
 * @param {React.ReactNode} props.fallback - Optional fallback content to render if the user doesn't have permission
 */
export const RequirePermission = ({ action, subject, children, fallback = null }) => {
  const { hasPermission } = useAuth();
  
  if (!hasPermission(action, subject)) {
    return fallback;
  }
  
  return <>{children}</>;
};

/**
 * Higher-order component that conditionally renders a component based on role
 * @param {Function} Component - Component to wrap
 * @param {Object} options - Options for the HOC
 * @param {string|string[]} options.roles - Role or array of roles required to view the component
 * @param {boolean} options.all - If true, user must have all roles. If false, user must have any role.
 * @param {React.ComponentType} options.fallback - Optional fallback component to render if the user doesn't have the required role(s)
 */
export const withRole = (Component, { roles, all = false, fallback = null } = {}) => {
  return (props) => (
    <RequireRole roles={roles} all={all} fallback={fallback}>
      <Component {...props} />
    </RequireRole>
  );
};

/**
 * Higher-order component that conditionally renders a component based on permission
 * @param {Function} Component - Component to wrap
 * @param {Object} options - Options for the HOC
 * @param {string} options.action - Action to check permission for
 * @param {string} options.subject - Subject to check permission for
 * @param {React.ComponentType} options.fallback - Optional fallback component to render if the user doesn't have permission
 */
export const withPermission = (Component, { action, subject, fallback = null } = {}) => {
  return (props) => (
    <RequirePermission action={action} subject={subject} fallback={fallback}>
      <Component {...props} />
    </RequirePermission>
  );
}; 