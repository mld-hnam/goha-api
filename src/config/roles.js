const permission = [
  'getUsers',
  'manageUsers',
  'manageOrders',
  'getOrders',
  'manageCustomers',
  'getCustomers',
  'manageShipmentHistory',
];
const allRoles = {
  user: [],
  admin: permission,
  agency: permission,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
