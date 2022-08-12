const mongoose = require("mongoose");

module.exports = () => {
  mongoose
    .connect(
      process.env.MONGODB_URI,
      // process.env.TEST_MONGODB_URI,
      {
        dbName: process.env.DAIRY_DB,
        useNewUrlParser: true,
        autoIndex: true,
        useUnifiedTopology: true,
        // useFindAndModify: false
      }
    )
    .then(() => {
      console.log("Dairy DB connected...");
    })
    .catch((err) => console.log(err.message));

  // mongoose.connection.on("connected", () => {
  //   console.log("purohit DB connected...");
  // });

  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Dairy DB connection is disconnected...");
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        "Dairy DB connection is disconnected due to app termination..."
      );
      process.exit(0);
    });
  });
};
