const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    //need to be done
    date:{
      type: String,
      required: true
    },
    locations:[
        {
        name: String,
        latitude: Number,
        longtitude: Number,
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);
