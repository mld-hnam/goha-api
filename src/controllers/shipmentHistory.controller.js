const httpStatus = require('http-status');
const pick = require('../utils/pick');
const getPeerFilter = require('../utils/getPeerFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { shipmentHistoryService } = require('../services');

const createShipmentHistory = catchAsync(async (req, res) => {
  const { status, userId, orderId } = req.body;
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  let statusHistory = await shipmentHistoryService.queryShipmentHistory({ status, userId, orderId }, options);
  if (statusHistory?.totalResults === 1) {
    statusHistory = await shipmentHistoryService.updateShipmentHistoryById(statusHistory.results[0]?._id, req.body);
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

module.exports = {
  createShipmentHistory,
  getShipmentHistory,
};
