const mongoose = require("mongoose");
const TotalMilk = require("../_models/availableMilk");
const MilkOrders = require("../_models/milkOrderDetails");

module.exports = async (req, res, next) => {
  if (!req.params.date) {
    return res.status(400).send({
      status: 400,
      message: "date is required, in the format yyyy-mm-dd",
    });
  }

  const [searchYear, searchMonth, searchDay] = req.params.date.split("-");

  // const currentDate = new Date();
  // const hours = currentDate.getHours();
  // const minutes = currentDate.getMinutes();
  // const seconds = currentDate.getSeconds();
  // const ms = currentDate.getMilliseconds();

  const searchDate = new Date(
    searchYear,
    searchMonth,
    searchDay,
    23,
    59,
    59,
    00
  );

  try {
    const ordersLeft = await MilkOrders.aggregate([
      {
        $match: {
          delivered: false,
          dispatched: false,
          date: {
            $lte: searchDate,
          },
        },
      },
    ]);

    const totalMilkAvailable = await TotalMilk.aggregate([
      {
        $match: {
          milkAvailable: { $gte: 1 },
        },
      },
    ]);

    const report = {
      [`total orders left as of ${req.params.date}`]: (() => {
        let sum = 0;
        ordersLeft.map((order) => {
          sum += order.requiredMilk;
        });
        return sum + " liters";
      })(),
      [`total milk available as of now`]: (() => {
        let sum = 0;
        totalMilkAvailable.map((milk) => {
          sum += milk.milkAvailable;
        });
        return sum + " liters";
      })(),
      [`total customers whose orders are pending`]: ordersLeft.length,
    };

    res.status(201).send(report);
  } catch (error) {
    next(error);
  }
};
