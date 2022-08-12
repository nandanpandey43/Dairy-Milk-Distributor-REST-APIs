const mongoose = require("mongoose");
const TotalMilk = require("../_models/availableMilk");
const MilkOrders = require("../_models/milkOrderDetails");

module.exports = async (req, res, next) => {
  if (!req.body.requiredMilk || !req.body.city || !req.body.date) {
    return res.status(400).send({
      status: 400,
      message: "requiredMilk, city & date is required",
    });
  }

  try {
    const totalMilkAvailableInTheCity = await TotalMilk.aggregate([
      {
        $match: {
          city: req.body.city,
          milkAvailable: { $gte: 1 },
        },
      },
    ]);

    let isEnoughMilkAvailable = 0;
    totalMilkAvailableInTheCity.map((milk) => {
      isEnoughMilkAvailable += milk.milkAvailable;
    });

    if (isEnoughMilkAvailable > req.body.requiredMilk) {
      const resp = await MilkOrders.create({
        requiredMilk: req.body.requiredMilk,
        address: req.body.address || "NA",
        city: req.body.city,
        date: req.body.date || new Date(),
      });

      res.status(201).send(resp);
    } else {
      const allCitiesAvailable = await TotalMilk.distinct("city");
      res.status(200).send({
        message: `We are running out of stock at ${req.body.city}, try at different location`,
        ["you may try in these cities"]: allCitiesAvailable,
      });
    }
  } catch (error) {
    next(error);
  }
};
