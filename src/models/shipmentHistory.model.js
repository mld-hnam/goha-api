const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const shipmentHistorySchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    orderId: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['CANCELED', 'PACKAGED', 'REVEIVED', 'SHIPPING', 'TOVIETNAM'],
    },
    note: {
      type: String,
      required: true,
      trim: true,
    },
    state: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
shipmentHistorySchema.plugin(toJSON);
shipmentHistorySchema.plugin(paginate);

/**
 * @typedef ShipmentHistory
 */
const ShipmentHistory = mongoose.model('ShipmentHistory', shipmentHistorySchema);

module.exports = ShipmentHistory;
