import mongoose from "mongoose";
import sign from "jsonwebtoken";
import jwt from "jsonwebtoken";

// const Joi = require("joi");
// schema for our database

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,

    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  isAdmin: Boolean,
});

usersSchema.methods.generateAuthToken = function () {
  const accessToken = jwt.sign(
    { email: this.email, id: this.id, isAdmin: this.isAdmin },
    "UsersAuth"
  );
  return accessToken;
};
// end here

const User = mongoose.model("User", usersSchema);
export default User;
