import React, { useState, useEffect } from 'react';
import { RequirePermission, RequireRole } from '../components/common/RBAC';
import { Actions, Subjects, RolePermissions, RoleHierarchy } from '../config/permissions';
import { useAuth } from '../context/AuthContext';

const RoleManagementPage = () => {
  const { user, hasPermission, hasRole } = useAuth();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserRoles, setSelectedUserRoles] = useState([]);

  useEffect(() => {
    // Debug logging for permissions
    console.log('RoleManagementPage - Current user:', user);
    console.log('RoleManagementPage - User roles:', user?.roles);
    console.log('RoleManagementPage - Can edit role:', hasPermission(Actions.EDIT_ROLE, Subjects.ROLE));
    console.log('RoleManagementPage - Can assign role:', hasPermission(Actions.ASSIGN_ROLE, Subjects.USER));
    console.log('RoleManagementPage - Is admin:', hasRole('ADMIN'));
  }, [user, hasPermission, hasRole]);

  // Mock data for demonstration
  useEffect(() => {
    // In a real app, this would come from an API
    setRoles(Object.keys(RolePermissions));
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', roles: ['USER'] },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', roles: ['MANAGER', 'AUDITOR'] },
      { id: 3, name: 'Admin User', email: 'admin@example.com', roles: ['ADMIN'] },
    ]);
  }, []);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setPermissions(RolePermissions[role] || {});
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSelectedUserRoles(user.roles || []);
  };

  const handlePermissionToggle = (subject, action) => {
    if (!selectedRole) return;

    const newPermissions = { ...permissions };
    
    if (!newPermissions[subject]) {
      newPermissions[subject] = [];
    }

    if (newPermissions[subject].includes(action)) {
      newPermissions[subject] = newPermissions[subject].filter(a => a !== action);
    } else {
      newPermissions[subject] = [...newPermissions[subject], action];
    }

    setPermissions(newPermissions);
    
    // In a real app, this would update the role permissions in the backend
    console.log(`Updated permissions for role ${selectedRole}:`, newPermissions);
  };

  const handleUserRoleToggle = (role) => {
    if (!selectedUser) return;

    const newUserRoles = [...selectedUserRoles];
    
    if (newUserRoles.includes(role)) {
      setSelectedUserRoles(newUserRoles.filter(r => r !== role));
    } else {
      setSelectedUserRoles([...newUserRoles, role]);
    }
    
    // In a real app, this would update the user roles in the backend
    console.log(`Updated roles for user ${selectedUser.name}:`, selectedUserRoles);
  };

  const handleSaveUserRoles = () => {
    if (!selectedUser) return;
    
    // In a real app, this would save the user roles to the backend
    console.log(`Saving roles for user ${selectedUser.name}:`, selectedUserRoles);
    
    // Update the local state
    setUsers(users.map(user => 
      user.id === selectedUser.id 
        ? { ...user, roles: selectedUserRoles } 
        : user
    ));
  };

  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white">Role Management</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role Management Section */}
          <RequirePermission action={Actions.EDIT_ROLE} subject={Subjects.ROLE}>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Manage Roles</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Select Role</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white"
                  value={selectedRole || ''}
                  onChange={(e) => handleRoleSelect(e.target.value)}
                >
                  <option value="">Select a role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              {selectedRole && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-white">Permissions for {selectedRole}</h3>
                  
                  {Object.keys(Subjects).map(subject => (
                    <div key={subject} className="mb-4">
                      <h4 className="font-medium mb-2 text-gray-300">{subject}</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Object.values(Actions)
                          .filter(action => action.includes(subject.toLowerCase()))
                          .map(action => (
                            <label key={action} className="flex items-center space-x-2 text-gray-300">
                              <input
                                type="checkbox"
                                checked={permissions[Subjects[subject]]?.includes(action) || false}
                                onChange={() => handlePermissionToggle(Subjects[subject], action)}
                                className="form-checkbox h-4 w-4 text-indigo-600"
                              />
                              <span>{action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                            </label>
                          ))}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                    onClick={() => console.log(`Saving permissions for role ${selectedRole}:`, permissions)}
                  >
                    Save Permissions
                  </button>
                </div>
              )}
            </div>
          </RequirePermission>
          
          {/* User Role Assignment Section */}
          <RequirePermission action={Actions.ASSIGN_ROLE} subject={Subjects.USER}>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 text-white">Assign Roles to Users</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 text-gray-300">Select User</label>
                <select 
                  className="w-full bg-gray-700 border border-gray-600 rounded-md p-2 text-white"
                  value={selectedUser?.id || ''}
                  onChange={(e) => {
                    const user = users.find(u => u.id === parseInt(e.target.value));
                    handleUserSelect(user);
                  }}
                >
                  <option value="">Select a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name} ({user.email})</option>
                  ))}
                </select>
              </div>
              
              {selectedUser && (
                <div>
                  <h3 className="text-lg font-medium mb-3 text-white">Roles for {selectedUser.name}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {roles.map(role => (
                      <label key={role} className="flex items-center space-x-2 text-gray-300">
                        <input
                          type="checkbox"
                          checked={selectedUserRoles.includes(role)}
                          onChange={() => handleUserRoleToggle(role)}
                          className="form-checkbox h-4 w-4 text-indigo-600"
                        />
                        <span>{role}</span>
                      </label>
                    ))}
                  </div>
                  
                  <button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
                    onClick={handleSaveUserRoles}
                  >
                    Save User Roles
                  </button>
                </div>
              )}
            </div>
          </RequirePermission>
        </div>
        
        {/* Role Hierarchy Section */}
        <RequireRole roles="ADMIN">
          <div className="mt-6 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-white">Role Hierarchy</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Inherits From</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {Object.keys(RoleHierarchy).map(role => (
                    <tr key={role}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {RoleHierarchy[role].length > 0 ? RoleHierarchy[role].join(', ') : 'None'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </RequireRole>
      </div>
    </div>
  );
};

export default RoleManagementPage; 