const Joi = require('joi');

const bodyRes = {
  orderId: Joi.string().required(),
  userId: Joi.string().required(),
  status: Joi.string().valid('CANCELED', 'PACKAGED', 'REVEIVED', 'SHIPPING', 'TOVIETNAM'),
  note: Joi.string(),
  state: Joi.boolean().required(),
};

const createShipmentHistory = {
  body: Joi.object().keys(bodyRes),
};

const getShipmentHistory = {
  query: Joi.object().keys({
    orderId: Joi.string().required(),
    userId: Joi.string().required(),
    status: Joi.string().valid('CANCELED', 'PACKAGED', 'REVEIVED', 'SHIPPING', 'TOVIETNAM'),
  }),
};

const getAllShipmentHistory = {
  query: Joi.object().keys({
    orderId: Joi.string().required(),
  }),
};

const deleteShipmentHistory = {
  body: Joi.object().keys({ orderId: Joi.string().required() }),
};

module.exports = {
  createShipmentHistory,
  getShipmentHistory,
  deleteShipmentHistory,
  getAllShipmentHistory,
};
