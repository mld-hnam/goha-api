const mongoose = require('mongoose');
const validator = require('validator');
const { toJSON, paginate } = require('./plugins');

const orderSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    fullName_ship: {
      type: String,
      required: true,
      trim: true,
    },
    phone_ship: {
      type: String,
      required: true,
      trim: true,
    },
    email_ship: {
      type: String,
      required: true,
      index: true,
      sparse: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    fullName_conSignee: {
      type: String,
      required: true,
      trim: true,
    },
    phone_conSignee: {
      type: String,
      required: true,
      trim: true,
    },
    email_conSignee: {
      type: String,
      required: true,
      index: true,
      sparse: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    flightNo: {
      type: String,
      required: true,
      trim: true,
    },
    weight: {
      type: Number,
      required: true,
      trim: true,
    },
    cost: {
      type: Number,
      required: true,
      trim: true,
    },
    fees: [
      {
        name: String,
        price: Number,
      },
    ],
    insurance: { type: Boolean, default: false },
    declareValue: { type: Number, trim: true },
    paymentBy: { type: String, required: true, enum: ['ZELLE', 'CASH', 'UNPAID'], default: 'ZELLE' },
    status: {
      type: String,
      required: true,
      enum: ['CANCELED', 'PACKAGED', 'REVEIVED', 'SHIPPING', 'TOVIETNAM'],
    },
    totalCost: { type: Number, trim: true, required: true },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
