const { default: mongoose } = require("mongoose");

const projectSchema = new mongoose.Schema({
  project_name: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  github: {
    type: String,
  },
  host: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);