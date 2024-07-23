const { default: mongoose } = require("mongoose");

const experienceSchema = new mongoose.Schema({
  company_name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  duration: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Experience", experienceSchema);
