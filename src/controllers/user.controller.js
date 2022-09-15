const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const getPeerFilter = require('../utils/getPeerFilter');

const createUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const user = await userService.createUser({ ...payload, isEmailVerified: true });
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const parseSearchText = getPeerFilter(req.query.filter, ['name', 'email', 'phone']);
  const filterStatus = pick(req.query, ['role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await userService.queryUsers({ ...filterStatus, ...parseSearchText }, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
