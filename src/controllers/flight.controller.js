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
  const parseSearchText = getPeerFilter(req.query.filter, ['code']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const filterStatus = pick(req.query, ['userId']);
  const result = await flightService.queryFlights({ ...parseSearchText, ...filterStatus }, options);
  res.send(result);
});

const getFlight = catchAsync(async (req, res) => {
  const flight = await flightService.getFlightById(req.params.flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  res.send(flight);
});

const getFlightUser = catchAsync(async (req, res) => {
  const flight = await flightService.getFlightByUserId(req.params.userId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  res.send(flight);
});

const getOrderFlight = catchAsync(async (req, res) => {
  const filterStatus = pick(req.query, ['flightId', 'code']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await flightService.queryFlights({ ...filterStatus }, options);
  res.send(result);
});

const updateFlight = catchAsync(async (req, res) => {
  const flight = await flightService.updateFlightById(req.params.flightId, req.body);
  res.send(flight);
});

const deleteFlight = catchAsync(async (req, res) => {
  await flightService.deleteFlightById(req.params.flightId);
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
