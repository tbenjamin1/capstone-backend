// const express = require("express");

import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello ben");
});

export default router;
