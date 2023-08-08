require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bookRouter = require("./controllers/book");

mongoose.set("strictQuery", false);

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

app.use("/api/books", bookRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Db Connected");
  })
  .catch(() => {
    console.error("error");
  });

module.exports = app;
