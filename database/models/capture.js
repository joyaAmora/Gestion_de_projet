const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  temperature: {
    type: Number,
    require: true,
  },
  moisture: {
    type: Number,
    require: true,
  },
}, {
  timestamps: true
});

const Capture = mongoose.model("Capture", schema);
module.exports = Capture;
