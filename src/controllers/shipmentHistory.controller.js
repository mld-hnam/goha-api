const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shipmentHistoryService } = require('../services');
const { ShipmentHistory } = require('../models');

const createShipmentHistory = catchAsync(async (req, res) => {
  const { status, userId, orderId } = req.body;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  let statusHistory = await shipmentHistoryService.queryShipmentHistory({ status, userId, orderId }, options);
  if (statusHistory.totalResults === 1) {
    statusHistory = await shipmentHistoryService.updateShipmentHistoryById(statusHistory.results[0]._id, req.body);
  } else {
    statusHistory = await shipmentHistoryService.createShipmentHistory(req.body);
  }
  res.status(httpStatus.CREATED).send(statusHistory);
});

const getShipmentHistory = catchAsync(async (req, res) => {
  const filterStatus = pick(req.query, ['orderId', 'userId', 'status']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await shipmentHistoryService.queryShipmentHistory({ ...filterStatus }, options);
  res.send(result);
});

const getAllShipmentHistory = catchAsync(async (req, res) => {
  const { orderId } = req.query;
  const result = await shipmentHistoryService.getShipmentHistoryByFilter({ orderId });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment History find by orderId not found');
  }
  res.send(result);
});

const deleteShipmentHistory = catchAsync(async (req, res) => {
  const { orderId } = req.body;
  const shipmentHistoryData = await ShipmentHistory.find({ orderId });
  if (shipmentHistoryData && shipmentHistoryData.length > 0) {
    shipmentHistoryData.map(async (item) => {
      await shipmentHistoryService.deleteShipmentHistoryById(item._id);
    });
    res.status(httpStatus.NO_CONTENT).send();
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment History find by orderId not found');
  }
});

module.exports = {
  createShipmentHistory,
  getShipmentHistory,
  deleteShipmentHistory,
  getAllShipmentHistory,
};
