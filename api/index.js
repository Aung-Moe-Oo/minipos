const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRoute = require(path.join(__dirname, "/Routes/Product.js"));
const userRoute = require(path.join(__dirname, "/Routes/User.js"));

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

dotenv.config();
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connection successful.");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/products", productRoute);
app.use("/api/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000!");
});
