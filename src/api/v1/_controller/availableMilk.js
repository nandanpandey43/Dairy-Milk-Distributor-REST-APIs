const mongoose = require("mongoose");
const TotalMilk = require("../_models/availableMilk");

module.exports = async (req, res, next) => {
  if (!req.body.totalMilk || !req.body.city) {
    return res.status(400).send({
      status: 400,
      message: "totalMilk, city required",
    });
  }

  try {
    const resp = await TotalMilk.create({
      milkAvailable: req.body.totalMilk,
      address: req.body.address || "NA",
      city: req.body.city,
      date: req.body.date || new Date(),
    });

    res.status(201).send(resp);
  } catch (error) {
    next(error);
  }
};
