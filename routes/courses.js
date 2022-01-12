import Express from "express";
import Joi from "joi";

import { adimnToken, auth } from "../midleware/auth.js";
import Course from "../modals/course.js";

const router = Express.Router();

// swagger documentation

// /**
//  * @swagger
//  * components:
//  *  schemas:
//  *   arcticle:
//  *      type:object
//  *      required:
//  *         -title
//  *         -author
//  *      properties:
//  *         id:
//  *            type:string,
//  *             description: the auto-generated id of the article
//  *          title:
//  *             type:string,
//  *             description:  article title
//  *           author:
//  *               type:string   ,
//  *              description: article author

//  */

router.get("/", auth, async (req, res) => {
  try {
    const courses = await Course.find().sort("name");
    res.send(courses);
  } catch (error) {
    res.send("error", error);
  }
});

router.get("/datail/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.status(200).send(course);
  } catch (error) {
    res.send("error", error);
  }
});

router.post("/", [auth, adimnToken], async (req, res) => {
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
    res.json("This user is not allowed");
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
    res.status(500).send("error", error);
  }

  // let Course = courses.find((c) => c.id === parseInt(req.params.id));
});

router.delete("/:id", [auth, adimnToken], async (req, res) => {
  const course = await Course.findByIdAndRemove(req.params.id);

  if (!course)
    return res.status(404).send("the course wuth the given id was not found ");

  res.send(course);
});

// const validate = (course) => {
//   const JoiSchema = Joi.object({ name: Joi.string().min(6).required() });

//   return JoiSchema.validate(course);
// };

export default router;
