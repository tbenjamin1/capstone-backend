import mongoose from "mongoose";
import blogs from "./routes/blogs.js";
import users from "./routes/users.js";
import home from "./routes/home.js";
// import swaggerDocument from "./swagger.json";
// import swaggerUi from "swagger-ui-express";
import createServer from './utils/server.js';
import message from'./routes/messages.js';



const app = createServer();


// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/blogs", blogs);
app.use("/api/users", users);
app.use("/api/message", message);

app.use("/", home);




// connection with  mongodatabase

const dbUrl ="mongodb+srv://benjamin:12345@cluster0.jgjow.mongodb.net/capstonebacked?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to mangodb");
  }).catch((error) => {
    console.log("could not be connected to mongodb", error);
  });





const port = process.env.PORT || 5000;
 
app.listen(port, () => console.log(`listening on port ${port} ....`));

