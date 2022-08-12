const mongoose = require("mongoose");
const MilkOrders = require("../_models/milkOrderDetails");

module.exports = async (req, res, next) => {
  console.log("delete route");
  if (!req.params.id) {
    return res.status(400).send({
      status: 400,
      message: "id is required",
    });
  }

  try {
    const resp = await MilkOrders.deleteOne({ _id: req.params.id });

    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};
