const router = require("express").Router();
const Trip = require("../models/Trip");

//post trips
router.post("/:userId", async (req, res) => {
  try {
    const newTrip = new Trip({
      userId: req.params.userId,
      date: req.body.date,
      locations: req.body.locations,
    });
    const trip = await newTrip.save();
    res.status(200).json(trip);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get trips by userId
router.get("/:userId", async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.params.userId });
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete trip by trip Id
router.delete("/:id", async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    await trip.deleteOne();
    res.status(200).json("deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
