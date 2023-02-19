const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("trip route");
})
module.exports = router;