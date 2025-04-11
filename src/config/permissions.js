// Define all possible actions in the system
export const Actions = {
  // Course related actions
  VIEW_COURSE: 'view_course',
  ENROLL_COURSE: 'enroll_course',
  CREATE_COURSE: 'create_course',
  EDIT_COURSE: 'edit_course',
  DELETE_COURSE: 'delete_course',
  
  // User management actions
  ADD_USER: 'add_user',
  EDIT_USER: 'edit_user',
  DEACTIVATE_USER: 'deactivate_user',
  VIEW_USER: 'view_user',
  
  // Content management actions
  UPLOAD_CONTENT: 'upload_content',
  APPROVE_CONTENT: 'approve_content',
  DELETE_CONTENT: 'delete_content',
  VIEW_CONTENT: 'view_content',
  
  // Reporting actions
  VIEW_REPORTS: 'view_reports',
  EXPORT_REPORTS: 'export_reports',
  GENERATE_REPORTS: 'generate_reports',
  
  // System settings actions
  CONFIGURE_SYSTEM: 'configure_system',
  MANAGE_INTEGRATIONS: 'manage_integrations',
  MANAGE_NOTIFICATIONS: 'manage_notifications',
  
  // Role management actions
  CREATE_ROLE: 'create_role',
  EDIT_ROLE: 'edit_role',
  DELETE_ROLE: 'delete_role',
  ASSIGN_ROLE: 'assign_role',
  VIEW_ROLE: 'view_role',
  
  // Audit actions
  VIEW_AUDIT_LOGS: 'view_audit_logs',
  
  // Partner management actions
  MANAGE_PARTNERS: 'manage_partners',
  APPROVE_PARTNER_ACCESS: 'approve_partner_access',
  REVOKE_PARTNER_ACCESS: 'revoke_partner_access',
};

// Define all possible subjects (resources) in the system
export const Subjects = {
  COURSE: 'course',
  USER: 'user',
  CONTENT: 'content',
  REPORT: 'report',
  SYSTEM: 'system',
  ROLE: 'role',
  AUDIT: 'audit',
  PARTNER: 'partner',
};

// Define role hierarchy
export const RoleHierarchy = {
  ADMIN: ['MANAGER', 'USER'],
  MANAGER: ['USER'],
  AUDITOR: ['USER'],
  PARTNER: [],
  USER: [],
};

// Define default permissions for each role
export const RolePermissions = {
  ADMIN: {
    [Subjects.COURSE]: [
      Actions.VIEW_COURSE,
      Actions.ENROLL_COURSE,
      Actions.CREATE_COURSE,
      Actions.EDIT_COURSE,
      Actions.DELETE_COURSE,
    ],
    [Subjects.USER]: [
      Actions.VIEW_USER,
      Actions.ADD_USER,
      Actions.EDIT_USER,
      Actions.DEACTIVATE_USER,
      Actions.ASSIGN_ROLE,
    ],
    [Subjects.CONTENT]: [
      Actions.VIEW_CONTENT,
      Actions.UPLOAD_CONTENT,
      Actions.APPROVE_CONTENT,
      Actions.DELETE_CONTENT,
    ],
    [Subjects.REPORT]: [
      Actions.VIEW_REPORTS,
      Actions.EXPORT_REPORTS,
      Actions.GENERATE_REPORTS,
    ],
    [Subjects.SYSTEM]: [
      Actions.CONFIGURE_SYSTEM,
      Actions.MANAGE_INTEGRATIONS,
      Actions.MANAGE_NOTIFICATIONS,
    ],
    [Subjects.ROLE]: [
      Actions.VIEW_ROLE,
      Actions.CREATE_ROLE,
      Actions.EDIT_ROLE,
      Actions.DELETE_ROLE,
      Actions.ASSIGN_ROLE,
    ],
    [Subjects.AUDIT]: [
      Actions.VIEW_AUDIT_LOGS,
    ],
    [Subjects.PARTNER]: [
      Actions.MANAGE_PARTNERS,
      Actions.APPROVE_PARTNER_ACCESS,
      Actions.REVOKE_PARTNER_ACCESS,
    ],
  },
  MANAGER: {
    [Subjects.COURSE]: [
      Actions.VIEW_COURSE,
      Actions.ENROLL_COURSE,
      Actions.CREATE_COURSE,
      Actions.EDIT_COURSE,
    ],
    [Subjects.USER]: [
      Actions.VIEW_USER,
      Actions.ADD_USER,
      Actions.EDIT_USER,
    ],
    [Subjects.CONTENT]: [
      Actions.VIEW_CONTENT,
      Actions.UPLOAD_CONTENT,
      Actions.APPROVE_CONTENT,
    ],
    [Subjects.REPORT]: [
      Actions.VIEW_REPORTS,
      Actions.EXPORT_REPORTS,
    ],
    [Subjects.PARTNER]: [
      Actions.MANAGE_PARTNERS,
      Actions.APPROVE_PARTNER_ACCESS,
    ],
  },
  AUDITOR: {
    [Subjects.COURSE]: [
      Actions.VIEW_COURSE,
    ],
    [Subjects.USER]: [
      Actions.VIEW_USER,
    ],
    [Subjects.CONTENT]: [
      Actions.VIEW_CONTENT,
    ],
    [Subjects.REPORT]: [
      Actions.VIEW_REPORTS,
      Actions.EXPORT_REPORTS,
      Actions.GENERATE_REPORTS,
    ],
    [Subjects.AUDIT]: [
      Actions.VIEW_AUDIT_LOGS,
    ],
  },
  PARTNER: {
    [Subjects.COURSE]: [
      Actions.VIEW_COURSE,
      Actions.ENROLL_COURSE,
    ],
    [Subjects.CONTENT]: [
      Actions.VIEW_CONTENT,
    ],
  },
  USER: {
    [Subjects.COURSE]: [
      Actions.VIEW_COURSE,
      Actions.ENROLL_COURSE,
    ],
    [Subjects.CONTENT]: [
      Actions.VIEW_CONTENT,
    ],
  },
}; 