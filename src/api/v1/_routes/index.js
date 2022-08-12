const {
  availableMilk,
  orderMilk,
  updateOrder,
  deleteData,
  checkCapacity,
  updateStatus,
} = require("../_controller");

const router = require("express").Router();

router.post("/addmilk", availableMilk);

router.post("/add", orderMilk);

router.put("/update/:id", updateOrder);

router.put("/updateStatus/:id", updateStatus);

router.delete("/delete/:id", deleteData);

router.get("/checkCapacity/:date", checkCapacity);

module.exports = router;
