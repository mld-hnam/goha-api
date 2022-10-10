const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const shipmentHistoryValidation = require('../../validations/shipmentHistory.validation');
const shipmentHistoryController = require('../../controllers/shipmentHistory.controller');

const router = express.Router();

router.get(
  '/get-all',
  validate(shipmentHistoryValidation.getAllShipmentHistory),
  shipmentHistoryController.getAllShipmentHistory
);

router
  .route('/')
  .post(
    auth('manageShipmentHistory'),
    validate(shipmentHistoryValidation.createShipmentHistory),
    shipmentHistoryController.createShipmentHistory
  )
  .get(
    auth('manageShipmentHistory'),
    validate(shipmentHistoryValidation.getShipmentHistory),
    shipmentHistoryController.getShipmentHistory
  )
  .delete(
    auth('manageShipmentHistory'),
    validate(shipmentHistoryValidation.deleteShipmentHistory),
    shipmentHistoryController.deleteShipmentHistory
  );

module.exports = router;
