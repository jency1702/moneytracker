const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
