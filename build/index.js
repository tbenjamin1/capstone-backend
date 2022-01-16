"use strict";

var config = require("config");

var mongoose = require("mongoose");

var helmet = require("helmet");

var morgan = require("morgan");

var express = require("express");

var app = express();

var courses = require("./routes/courses");

var users = require("./routes/users");

var home = require("./routes/home");

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(helmet());
app.use("/api/courses", courses);
app.use("/api/users", users);
app.use("/", home);

if (!config.has("jwtPrivateKey")) {
  console.log("fATAL ERROR:  jwtPrivateKey is not defined");
  process.exit(1);
} /// connection with data base


mongoose.connect("mongodb://localhost/posts").then(function () {
  console.log("connected to mangodb");
})["catch"](function (error) {
  console.log("could not be connected to mongodb", error);
}); // end here

var port = process.env.PORT || 4000;
app.listen(port, function () {
  return console.log("listening on port ".concat(port, " ...."));
});
//# sourceMappingURL=index.js.map