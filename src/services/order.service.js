const httpStatus = require('http-status');
const { Order } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} orderBody
 * @returns {Promise<User>}
 */
const createOrder = async (orderBody) => {
  return Order.create(orderBody);
};

/**
 * Query for orders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryOrders = async (filter, options) => {
  const orders = await Order.paginate(filter, options);
  return orders;
};

/**
 * Get order by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getOrderById = async (id) => {
  return Order.findById(id);
};

/**
 * Update order by id
 * @param {ObjectId} orderId
 * @param {Object} updateBody
 * @returns {Promise<Order>}
 */
const updateOrderById = async (id, updateBody) => {
  const order = await getOrderById(id);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  Object.assign(order, updateBody);
  await order.save();
  return order;
};

const getOrderByUserId = async (userId) => {
  const order = await Order.find({ userId });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
};

const getOrderByCode = async (code) => {
  const order = await Order.findOne({ code });
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  return order;
};

/**
 * Delete order by id
 * @param {ObjectId} orderId
 * @returns {Promise<User>}
 */
const deleteOrderById = async (orderId) => {
  const order = await getOrderById(orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Order not found');
  }
  await Order.remove();
  return order;
};

module.exports = {
  createOrder,
  queryOrders,
  getOrderById,
  updateOrderById,
  deleteOrderById,
  getOrderByUserId,
  getOrderByCode,
};
