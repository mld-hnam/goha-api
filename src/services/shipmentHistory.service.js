const httpStatus = require('http-status');
const { ShipmentHistory } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} shipmentHistoryBody
 * @returns {Promise<User>}
 */
const createShipmentHistory = async (shipmentHistoryBody) => {
  return ShipmentHistory.create(shipmentHistoryBody);
};

/**
 * Query for shipmentHistory
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryShipmentHistory = async (filter, options) => {
  const shipmentHistory = await ShipmentHistory.paginate(filter, options);
  return shipmentHistory;
};

/**
 * Get shipmentHistory by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getShipmentHistoryById = async (id) => {
  return ShipmentHistory.findById(id);
};

const getShipmentHistoryByFilter = async ({ ...filter }) => {
  const res = ShipmentHistory.find({ ...filter });
  return res;
};

/**
 * Update shipmentHistory by id
 * @param {ObjectId} shipmentHistoryId
 * @param {Object} updateBody
 * @returns {Promise<shipmentHistory>}
 */
const updateShipmentHistoryById = async (id, updateBody) => {
  const shipmentHistory = await getShipmentHistoryById(id);
  if (!shipmentHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Shipment History search by id not found');
  }
  Object.assign(shipmentHistory, updateBody);
  await ShipmentHistory.save();
  return shipmentHistory;
};

/**
 * Delete shipmentHistory by id
 * @param {ObjectId} shipmentHistoryId
 * @returns {Promise<User>}
 */
const deleteShipmentHistoryById = async (shipmentHistoryId) => {
  const shipmentHistory = await getShipmentHistoryById(shipmentHistoryId);
  if (!shipmentHistory) {
    throw new ApiError(httpStatus.NOT_FOUND, 'shipment History not found');
  }
  await shipmentHistory.remove();
  return shipmentHistory;
};

module.exports = {
  createShipmentHistory,
  queryShipmentHistory,
  getShipmentHistoryById,
  updateShipmentHistoryById,
  deleteShipmentHistoryById,
  getShipmentHistoryByFilter,
};
