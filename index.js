const config = require("config");
const mongoose = require("mongoose");

const helmet = require("helmet");

const morgan = require("morgan");

const express = require("express");

const app = express();

const courses = require("./routes/courses");
const users = require("./routes/users");
const home = require("./routes/home");

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
