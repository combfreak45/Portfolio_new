const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.URL)
  } catch (err) {
    console.log(err);
  }
};

module.exports = connect;
