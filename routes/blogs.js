import Express from "express";
import Joi from "joi";

import { adimnToken, auth } from "../midleware/auth.js";
import Blog from "../modals/blogposts.js";

const router = Express.Router();



router.get("/get-blog", async (req, res) => {
  try {
    const blogs = await Blog.find().sort("name");
    res.status(200).json(blogs);
  } catch (error) {
    res.send("error", error);
  }
});

router.get("/datail/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.status(200).send(blog);
  } catch (error) {
    res.send("error", error);
  }
});

// [auth, adimnToken]
router.post("/add-blog", async (req, res) => {
  console.log(req.body);
  // res.json(req.body);

  let blog = new Blog({
    name: req.body.name,
    summary: req.body.summary,
    body: req.body.body,
    author: req.body.author,
    isPublished: req.body.isPublished,
  });

  try {
    const newblog = await blog.save();

    res.send(newblog);
  } catch (error) {
    res.json("This user is not allowed");
  }
});

// updTE

router.put("/update:id", async (req, res) => {
  // validate
  // const schema = Joi.object({ name: Joi.string().min(6).required() });
  // const validation = validate(req.body);

  // if (validation.error) return res.status(400).send("name should be required ");
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id);
    blog.name = req.body.name;
    const updateBlog = await blog.save();
    res.send(updateBlog);
  } catch (error) {
    res.status(500).send("error", error);
  }

  // let Course = blogs.find((c) => c.id === parseInt(req.params.id));
});

router.delete("/delete:id", [auth, adimnToken], async (req, res) => {
  const blog = await Blog.findByIdAndRemove(req.params.id);

  if (!blog)
    return res.status(404).send("the course wuth the given id was not found ");

  res.send(blog);
});

// const validate = (course) => {
//   const JoiSchema = Joi.object({ name: Joi.string().min(6).required() });

//   return JoiSchema.validate(course);
// };

export default router;
