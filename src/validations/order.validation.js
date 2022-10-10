const Joi = require('joi');
const { objectId } = require('./custom.validation');

const bodyRes = {
  userId: Joi.string().required(),
  fullName_ship: Joi.string().required(),
  phone_ship: Joi.string().required(),
  email_ship: Joi.string().required().email(),
  fullName_conSignee: Joi.string().required(),
  phone_conSignee: Joi.string().required(),
  email_conSignee: Joi.string().required().email(),
  status: Joi.string().valid('CANCELED', 'PACKAGED', 'REVEIVED', 'SHIPPING', 'TOVIETNAM'),
  code: Joi.string(),
  flightNo: Joi.string().required(),
  weight: Joi.number().required(),
  cost: Joi.number().required(),
  insurance: Joi.boolean().required(),
  declareValue: Joi.number(),
  paymentBy: Joi.string().required().valid('ZELLE', 'CASH', 'UNPAID'),
  totalCost: Joi.number().required(),
  fees: Joi.array(),
};

const createOrder = {
  body: Joi.object().keys(bodyRes),
};

const getOrders = {
  query: Joi.object().keys({
    code: Joi.string(),
    flightNo: Joi.string(),
    status: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    filter: Joi.string(),
    createdAt: Joi.string(),
    userId: Joi.string().custom(objectId),
  }),
};

const getOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const updateOrder = {
  params: Joi.object().keys({
    orderId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({ ...bodyRes, createdAt: Joi.string(), fees: Joi.array(), updatedAt: Joi.string(), id: Joi.string().required() })
    .min(1),
};

const updateOrders = {
  body: Joi.object()
    .keys({
      ids: Joi.array(),
      status: Joi.string(),
      userId: Joi.string().custom(objectId),
      note: Joi.string(),
      state: Joi.boolean(),
    })
    .min(1),
};

const deleteOrder = {
  params: Joi.object().keys({
    orderId: Joi.string().custom(objectId),
  }),
};

const getOrderUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const getOrderFlight = {
  query: Joi.object().keys({
    flightNo: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    createdAt: Joi.string(),
    userId: Joi.string().custom(objectId),
  }),
};

const getOrderByCode = {
  body: Joi.object().keys({ code: Joi.string() }),
};

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderUser,
  getOrderFlight,
  getOrderByCode,
  updateOrders,
};
