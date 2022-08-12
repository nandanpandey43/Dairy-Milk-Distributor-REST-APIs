const mongoose = require("mongoose");

const DairySchema = new mongoose.Schema(
  {
    requiredMilk: { type: Number },
    address: { type: String },
    city: { type: String },
    delivered: { type: Boolean, default: false },
    placed: { type: Boolean, default: false },
    packed: { type: Boolean, default: false },
    dispatched: { type: Boolean, default: false },
    date: { type: Date },
    timestamp: { type: Date, default: new Date() },
  },
  {
    collection: "milk-orders",
  }
);

const MilkOrders = mongoose.model("milk-orders", DairySchema);

module.exports = MilkOrders;
