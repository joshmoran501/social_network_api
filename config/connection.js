const mongoose = require("mongoose");

const connectionString =
  process.env.mongoDB_URI || "mongodb://127.0.0.1:27017/socialNetworkAPI";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set("debug", true);

module.exports = mongoose.connection;
