const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  temperature: {
    type: Number,
    require: false,
  },
  moisture: {
    type: Number,
    require: false,
  },
  body: {
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
