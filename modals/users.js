const mongoose = require("mongoose");

const Joi = require("joi");
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
});

usersSchema.methods.generateAuthToken = function () {
  const accessToken = sign(
    { email: user.email, id: this.id, name: user.name },
    "UsersAuth"
  );
  return accessToken;
};

// end here

module.exports = mongoose.model("User", usersSchema);
