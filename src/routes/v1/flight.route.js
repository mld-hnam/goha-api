const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const flightValidation = require('../../validations/flight.validation');
const flightController = require('../../controllers/flight.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageFlights'), validate(flightValidation.createFlight), flightController.createFlight)
  .get(auth('getFlights'), validate(flightValidation.getFlights), flightController.getFlights);

router
  .route('/:flightId')
  .get(auth('getFlights'), validate(flightValidation.getFlight), flightController.getFlight)
  .put(auth('manageFlights'), validate(flightValidation.updateFlight), flightController.updateFlight)
  .delete(auth('manageFlights'), validate(flightValidation.deleteFlight), flightController.deleteFlight);

router
  .route('/flight-user/:userId')
  .get(auth('getOrders'), validate(flightValidation.getFlightUser), flightController.getFlightUser);

module.exports = router;
