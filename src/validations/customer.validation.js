const Joi = require('joi');
const { objectId } = require('./custom.validation');

const bodyRes = {
  userId: Joi.string().required(),
  fullname: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required().email(),
  address: Joi.string().required(),
};

const createCustomer = {
  body: Joi.object().keys(bodyRes),
};

const getCustomers = {
  query: Joi.object().keys({
    filter: Joi.string(),
    userId: Joi.string(),
    name: Joi.string(),
    phone: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getCustomer = {
  params: Joi.object().keys({
    customerId: Joi.string().custom(objectId),
  }),
};

const checkEmail = {
  body: Joi.object().keys({ email: Joi.string().required() }).min(1),
};

const updateCustomer = {
  params: Joi.object().keys({
    customerId: Joi.required().custom(objectId),
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
