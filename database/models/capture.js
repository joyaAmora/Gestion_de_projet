const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  AirTemp: {
    type: Number,
    require: false,
  },
  AirHum: {
    type: Number,
    require: false,
  },
  FanStatus: {
    type: String,
  },
  LightStatus: {
    type: String,
  },
}, {
  timestamps: {
    type:Date,
    default: Date.now
},
});

const Capture = mongoose.model("Capture", schema);
module.exports = Capture;
