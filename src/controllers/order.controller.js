const httpStatus = require('http-status');
const pick = require('../utils/pick');
const getPeerFilter = require('../utils/getPeerFilter');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { orderService, shipmentHistoryService } = require('../services');
const generateCode = require('../utils/generateCode');
const { ShipmentHistory } = require('../models');

const createOrder = catchAsync(async (req, res) => {
  const payload = req.body;
  const code = generateCode();
  const status = 'PACKAGED';
  const order = await orderService.createOrder({ ...payload, code, status });
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchAsync(async (req, res) => {
  const parseSearchText = getPeerFilter(req.query.filter, ['fullName_ship', 'email_ship', 'phone_ship', 'code', 'flightNo']);
  const filterStatus = pick(req.query, ['status', 'userId']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders({ ...filterStatus, ...parseSearchText }, options);
  res.send(result);
});

const getOrder = catchAsync(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const getOrderUser = catchAsync(async (req, res) => {
  const order = await orderService.getOrderByUserId(req.params.userId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const getOrderFlight = catchAsync(async (req, res) => {
  const filterStatus = pick(req.query, ['userId', 'flightNo']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await orderService.queryOrders({ ...filterStatus }, options);
  res.send(result);
});

const updateOrder = catchAsync(async (req, res) => {
  const order = await orderService.updateOrderById(req.params.orderId, req.body);
  res.send(order);
});

const updateOrders = catchAsync(async (req, res) => {
  const { ids, status, userId, note, state } = req.body;
  if (!ids && ids.length <= 0) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Orders not found');
  }

  const updateItem = async (item) => {
    const order = await orderService.getOrderById(item);
    if (order) {
      await orderService.updateOrderById(order._id, { ...order, status });
      const findHistory = await ShipmentHistory.findOne({ orderId: item, status, userId });

      if (findHistory) {
        await shipmentHistoryService.updateShipmentHistoryById(findHistory._id, { note, state, status });
      } else {
        await shipmentHistoryService.createShipmentHistory({ status, userId, note, state, orderId: item });
      }
    }
  };

  const promises = ids.map(updateItem);

  await Promise.all(promises);

  res.status(httpStatus.OK).send();
});

const getOrderByCode = catchAsync(async (req, res) => {
  const order = await orderService.getOrderByCode(req.body.code);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  res.send(order);
});

const deleteOrder = catchAsync(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
  getOrderUser,
  getOrderFlight,
  updateOrders,
  getOrderByCode,
};
