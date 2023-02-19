const router = require("express").Router();
const Trip = require("../models/Trip");

router.get("/:trips",(req,res)=>{
    try {
        // const trip = await User.findById(req.params.id);
        // const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(other);
      } catch (err) {
        res.status(500).json(err);
      }
})
module.exports = router;