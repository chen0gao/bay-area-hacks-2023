const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const tripRoute = require("./routes/trips");
const cors = require("cors");

dotenv.config();

mongoose.set("strictQuery", true);
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("common"));

//
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/trips", tripRoute);

app.get("/", (req, res) => {
  res.send("test");
});
app.listen(8800, () => {
  console.log("Backend server is running!");
});
