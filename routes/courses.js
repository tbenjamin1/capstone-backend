const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const Joi = require("joi");
const Course = require("../modals/course");

router.get("/", async (req, res) => {
  try {
    const courses = await Course.find().sort("name");
    res.send(courses);
  } catch (error) {
    res.send("error", error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.send(course);
  } catch (error) {
    res.send("error", error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  // res.json(req.body);

  let course = new Course({
    name: req.body.name,
    author: req.body.author,
    isPublished: req.body.isPublished,
  });

  try {
    const newcourse = await course.save();

    res.send(newcourse);
  } catch (error) {
    res.send("error", error);
  }
});

// updTE

router.put("/:id", async (req, res) => {
  // validate
  // const schema = Joi.object({ name: Joi.string().min(6).required() });
  // const validation = validate(req.body);

  // if (validation.error) return res.status(400).send("name should be required ");
  try {
    const course = await Course.findByIdAndUpdate(req.params.id);
    course.name = req.body.name;
    const updateCourse = await course.save();
    res.send(updateCourse);
  } catch (error) {
    res.send("error", error);
  }

  // let Course = courses.find((c) => c.id === parseInt(req.params.id));
});

router.delete("./:id", async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course)
    return res.status(404).send("the course wuth the given id was not found ");

  res.send(course);
});

// const validate = (course) => {
//   const JoiSchema = Joi.object({ name: Joi.string().min(6).required() });

//   return JoiSchema.validate(course);
// };

module.exports = router;
