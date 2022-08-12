const mongoose = require("mongoose");

const MilkAvailableSchema = new mongoose.Schema(
  {
    milkAvailable: { type: Number, required: true },
    address: { type: String },
    city: { type: String, required: true },
    date: { type: Date, required: true },
    timestamp: { type: Date, default: new Date() },
  },
  {
    collection: "milk-available",
  }
);

const TotalMilk = mongoose.model("milk-available", MilkAvailableSchema);

module.exports = TotalMilk;
