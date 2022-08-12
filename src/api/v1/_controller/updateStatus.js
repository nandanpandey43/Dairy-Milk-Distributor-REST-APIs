const mongoose = require("mongoose");
const TotalMilk = require("../_models/availableMilk");
const MilkOrders = require("../_models/milkOrderDetails");

module.exports = async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send({
      status: 400,
      message: "id is required",
    });
  }

  const statusToUpdate = {};

  try {
    const resp = await MilkOrders.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    res.status(201).send(resp);

    const decreaseMilk = await TotalMilk.findOneAndUpdate(
      {
        city: resp.city,
      },
      {
        $inc: { milkAvailable: -resp.requiredMilk },
      }
    );
  } catch (error) {
    next(error);
  }
};
