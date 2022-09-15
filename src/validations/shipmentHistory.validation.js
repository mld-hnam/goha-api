const Joi = require('joi');
const { objectId } = require('./custom.validation');

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

const deleteShipmentHistory = {
  body: Joi.object().keys({ orderId: Joi.string().required() }),
};

module.exports = {
  createShipmentHistory,
  getShipmentHistory,
  deleteShipmentHistory,
};
