const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const customerValidation = require('../../validations/customer.validation');
const customerController = require('../../controllers/customer.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageCustomers'), validate(customerValidation.createCustomer), customerController.createCustomer)
  .get(auth('getCustomers'), validate(customerValidation.getCustomers), customerController.getCustomers);

router
  .route('/:customerId')
  .get(auth('getCustomers'), validate(customerValidation.getCustomer), customerController.getCustomer)
  .put(auth('manageCustomers'), validate(customerValidation.updateCustomer), customerController.updateCustomer)
  .delete(auth('manageCustomers'), validate(customerValidation.deleteCustomer), customerController.deleteCustomer);
router
  .route('/checkemail')
  .post(auth('getCustomers'), validate(customerValidation.checkEmail), customerController.checkEmail);

module.exports = router;
