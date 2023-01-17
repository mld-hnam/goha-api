const Joi = require('joi');
const { objectId } = require('./custom.validation');

const bodyRes = {
  code: Joi.string().required(),
};

const createFlight = {
  body: Joi.object().keys(bodyRes),
};

const getFlights = {
  query: Joi.object().keys({
    code: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    filter: Joi.string(),
    createdAt: Joi.string(),
    userId: Joi.string().custom(objectId),
  }),
};

const updateFlight = {
  params: Joi.object().keys({
    flightId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({ ...bodyRes, createdAt: Joi.string(), updatedAt: Joi.string(), id: Joi.string().required() })
    .min(1),
};

const deleteFlight = {
  params: Joi.object().keys({
    flightId: Joi.string().custom(objectId),
  }),
};

const getFlight = {
  query: Joi.object().keys({
    code: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    createdAt: Joi.string(),
    userId: Joi.string().custom(objectId),
  }),
};

const getFlightByCode = {
  body: Joi.object().keys({ code: Joi.string() }),
};

module.exports = {
  createFlight,
  getFlights,
  getFlight,
  updateFlight,
  deleteFlight,
  getFlightByCode,
};
