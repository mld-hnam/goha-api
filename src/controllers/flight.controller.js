const httpStatus = require('http-status');
const pick = require('../utils/pick');
const getPeerFilter = require('../utils/getPeerFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { flightService } = require('../services');

const createFlight = catchAsync(async (req, res) => {
  const payload = req.body;
  const flight = await flightService.createFlight({ ...payload });
  res.status(httpStatus.CREATED).send(flight);
});

const getFlights = catchAsync(async (req, res) => {
  const parseSearchText = getPeerFilter(req.query.filter, ['code', 'name']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await flightService.queryFlights({ ...parseSearchText }, options);
  res.send(result);
});

const getFlight = catchAsync(async (req, res) => {
  const order = await flightService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const getFlightUser = catchAsync(async (req, res) => {
  const order = await flightService.getOrderByUserId(req.params.userId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const getOrderFlight = catchAsync(async (req, res) => {
  const filterStatus = pick(req.query, ['userId', 'flightNo']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await flightService.queryOrders({ ...filterStatus }, options);
  res.send(result);
});

const updateFlight = catchAsync(async (req, res) => {
  const order = await flightService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

const deleteFlight = catchAsync(async (req, res) => {
  await flightService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateFlight,
  deleteFlight,
  getFlightUser,
  getOrderFlight,
};
