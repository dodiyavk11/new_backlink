/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin'],
  staff: ['admin', 'staff'],
  user: ['user'],
  // user: ['user'],
  onlyGuest: [],
};

export default authRoles;
