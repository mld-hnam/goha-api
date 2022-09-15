const httpStatus = require('http-status');
const pick = require('../utils/pick');
const getPeerFilter = require('../utils/getPeerFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { customerService } = require('../services');

const createCustomer = catchAsync(async (req, res) => {
  const payload = req.body;
  const customer = await customerService.createCustomer({ ...payload });
  res.status(httpStatus.CREATED).send(customer);
});

const getCustomers = catchAsync(async (req, res) => {
  const parseSearchText = getPeerFilter(req.query.filter, ['fullname', 'email', 'phone']);
  const filterStatus = pick(req.query, ['userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await customerService.queryCustomers({ ...filterStatus, ...parseSearchText }, options);
  res.send(result);
});

const getCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.getCustomerById(req.params.customerId);
  if (!customer) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Customer not found');
  }
  res.send(customer);
});

const checkEmail = catchAsync(async (req, res) => {
  const customer = await customerService.getCustomerByEmail(req.body.email);
  if (!customer) {
    res.send(undefined);
    // throw new ApiError(httpStatus.NOT_FOUND, 'Customer find with email not found');
  }
  res.send(customer);
});

const updateCustomer = catchAsync(async (req, res) => {
  const customer = await customerService.updateCustomerById(req.params.customerId, req.body);
  res.send(customer);
});

const deleteCustomer = catchAsync(async (req, res) => {
  await customerService.deleteCustomerById(req.params.customerId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  checkEmail,
};
