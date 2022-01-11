// const config = require("config");
import config from "config";

import mongoose from "mongoose";
// const mongoose = require("mongoose");

// const helmet = require("helmet");
import helmet from "helmet";

// const morgan = require("morgan");

// const express = require("express");
import express from "express";
import courses from "./routes/courses.js";
import users from "./routes/users.js";
import home from "./routes/home.js";

// const courses = require("./routes/courses");
// const users = require("./routes/users");
// const home = require("./routes/home");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/courses", courses);
app.use("/api/users", users);
app.use("/", home);

if (!config.has("jwtPrivateKey")) {
  console.log("fATAL ERROR:  jwtPrivateKey is not defined");
  process.exit(1);
}

/// connection with data base

mongoose
  .connect("mongodb://localhost/posts")
  .then(() => {
    console.log("connected to mangodb");
  })

  .catch((error) => {
    console.log("could not be connected to mongodb", error);
  });

// end here

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`listening on port ${port} ....`));
