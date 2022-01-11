// const jwt = require("jsonwebtoken");
// const config = require("config");
// const bcrypt = require("bcrypt");
// const _ = require("lodash");
// const mongoose = require("mongoose");
// const express = require("express");
// const Joi = require("joi");

import Joi from "joi";

import config from "config";
import bcrypt from "bcrypt";
import _ from "lodash";
import express from "express";

import jwt from "jsonwebtoken";
import jsonwebtoken from "jsonwebtoken";
import User from "../modals/users.js";
// const { sign } = require("jsonwebtoken");
// const { validateToken } = require("../midleware/UserMiddleware");

import { validateToken, adimnToken } from "../midleware/UserMiddleware.js";

const router = express.Router();

router.get("/", validateToken, async (req, res) => {
  try {
    const users = await User.find().sort("name");
    res.send(users);
  } catch (error) {
    res.send("error", error);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send("name should be required ");

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("arleady user registered");

  user = new User(
    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
      "confPassword",
    ])
  );

  // if(user.password != user.confPassword){
  //   return res.json("Password donnot match")
  // }

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  user = await user.save();
  const accessToken = jwt.sign(
    { email: user.email, id: user.id, name: user.name },
    "UsersAuth"
  );

  res.status(200).json({
    token: accessToken,
    //  name: user.name,
    id: user.id,
    email: user.email,
  });

  // const accessToken = jwt.sign({ _id: user._id }, config.has("jwtPrivateKey"));
  // const accessToken = user.generateAuthToken();

  // res.header("x-auth-token", accessToken).send(_.pick(user, ["name", "email"]));

  res.json("user registered");
});

const validateUser = (userdata) => {
  const JoiSchema = Joi.object({
    firstName: Joi.string().min(6).max(50).required(),
    lastName: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required(),
  });

  return JoiSchema.validate(userdata);
};

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "user doesn't exist" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    // const accessToken = user.generateAuthToken();
    const accessToken = jwt.sign(
      { email: user.email, id: user.id, name: user.name },
      "UsersAuth"
    );

    res.json({
      token: accessToken,
      name: user.name,
      id: user.id,
      email: user.email,
    });

    if (!validPassword)
      return res.status(400).send("invalid email or password");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//delete
router.delete("/delete/:id", validateToken, async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res.status(404).send("the user wuth the given id was not found ");

  res.json("user deleted");
});

export default router;
