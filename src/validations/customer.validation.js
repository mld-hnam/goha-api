const Joi = require('joi');
const { objectId } = require('./custom.validation');

const bodyRes = {
  userId: Joi.string().required(),
  fullname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required().email(),
};

const createCustomer = {
  body: Joi.object().keys(bodyRes),
};

const getCustomers = {
  query: Joi.object().keys({
    fullname: Joi.string(),
    phone: Joi.string(),
    email: Joi.string(),
    userId: Joi.string(),
    filter: Joi.string(),
  }),
};

const getCustomer = {
  params: Joi.object().keys({
    customerID: Joi.string().custom(objectId),
  }),
};

const checkEmail = {
  body: Joi.object().keys({ email: Joi.string().required() }).min(1),
};

const updateCustomer = {
  params: Joi.object().keys({
    customerID: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({ ...bodyRes, createdAt: Joi.string(), updatedAt: Joi.string(), id: Joi.string().required() })
    .min(1),
};

const deleteCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  checkEmail,
};
