const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());
require("./src/api/v1/_database/index")();

app.get("/", (req, res) => {
  res.send("swagger docs here");
});

const routeHandler = require("./src/api/v1/_routes/index");
app.use("/api/v1", routeHandler);

app.use("*", (req, res) => {
  res.status(404).send({ status: 404, message: "routes error" });
});

app.use((err, req, res, next) => {
  console.log("error ", err.message);
  res.status(err.status || 400).send(err.message);
});

app.listen(process.env.PORT || 5000, () => {
  console.log("listening on port 3000!");
});
