const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: false,
      unique: true,
    },
    AirTemp: {
      type: Number,
      required: false,
      maxlength: 30,
      trim: true,
    },
    AirHum: {
      type: Number,
      required: false,
      maxlength: 1000,
      trim: true,
    },
    SolHum: {
      type: Number,
      required: false,
      maxlength: 1000,
      trim: true,
    },
    FanStatus: {
      type: String,
      required: false,
      maxlength: 1000,
      trim: true,
    },
    LightStatus: {
      type: String,
      required: false,
      maxlength: 1000,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

schema.pre("validate", function (next) {
  Capture.getNextCode((code) => {
    console.log(code);
    this.code = code;
    next();
  });
});

schema.statics.getNextCode = function (callback) {
  this.countDocuments((err, count) => {
    if (count) {
      this.findOne()
        .sort({ code: -1 })
        .exec((err, capture) => {
          callback(capture.code + 1);
        });
    } else {
      callback(1);
    }
  });
};

const Capture = mongoose.model("Capture", schema);

module.exports = Capture;
