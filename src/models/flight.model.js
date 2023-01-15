const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const flightSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json

flightSchema.plugin(toJSON);
flightSchema.plugin(paginate);

/**
 * @typedef Flight
 */
const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
