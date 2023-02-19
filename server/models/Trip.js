const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    //need to be done
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);