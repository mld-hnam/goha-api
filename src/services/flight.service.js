const httpStatus = require('http-status');
const { Flight } = require('../models');
const ApiError = require('../utils/ApiError');

const createFlight = async (userBody) => {
  return Flight.create(userBody);
};

const queryFlights = async (filter, options) => {
  const flights = await Flight.paginate(filter, options);
  return flights;
};

const getFlightById = async (id) => {
  return Flight.findById(id);
};

const updateFlightById = async (flightId, updateBody) => {
  const flight = await getFlightById(flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  Object.assign(flight, updateBody);
  await flight.save();
  return flight;
};

const deleteFlightById = async (flightId) => {
  const flight = await getFlightById(flightId);
  if (!flight) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Flight not found');
  }
  await flight.remove();
  return flight;
};

module.exports = {
  createFlight,
  queryFlights,
  getFlightById,
  updateFlightById,
  deleteFlightById,
};
