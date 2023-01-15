const permission = [
  'getUsers',
  'manageUsers',
  'manageOrders',
  'getOrders',
  'manageCustomers',
  'getCustomers',
  'manageShipmentHistory',
  'manageFlights',
  'getFlights',
];
const allRoles = {
  user: permission,
  admin: permission,
  agency: permission,
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
