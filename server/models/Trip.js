const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    tripName:{
      type: String,
      required: true,
    }, 
    tripDate:{
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);