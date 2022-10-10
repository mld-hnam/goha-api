const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const orderValidation = require('../../validations/order.validation');
const orderController = require('../../controllers/order.controller');

const router = express.Router();

router.post('/find-code', validate(orderValidation.getOrderByCode), orderController.getOrderByCode);

router
  .route('/')
  .post(auth('manageOrders'), validate(orderValidation.createOrder), orderController.createOrder)
  .put(auth('manageOrders'), validate(orderValidation.updateOrders), orderController.updateOrders)
  .get(auth('getOrders'), validate(orderValidation.getOrders), orderController.getOrders);

router
  .route('/order-flight')
  .get(auth('getOrders'), validate(orderValidation.getOrderFlight), orderController.getOrderFlight);

router
  .route('/:orderId')
  .get(auth('getOrders'), validate(orderValidation.getOrder), orderController.getOrder)
  .put(auth('manageOrders'), validate(orderValidation.updateOrder), orderController.updateOrder)
  .delete(auth('manageOrders'), validate(orderValidation.deleteOrder), orderController.deleteOrder);

router
  .route('/order-user/:userId')
  .get(auth('getOrders'), validate(orderValidation.getOrderUser), orderController.getOrderUser);

module.exports = router;
