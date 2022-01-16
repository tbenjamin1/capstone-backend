import config from "config";
import mongoose from "mongoose";
import helmet from "helmet";
import express from "express";
import courses from "./routes/courses.js";
import users from "./routes/users.js";
import home from "./routes/home.js";

import swaggerDocument from "./swagger.json";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
