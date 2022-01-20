import Express from "express";
import Joi from "joi";

import { adimnToken, auth } from "../midleware/auth.js";
import Blog from "../modals/blogposts.js";

const router = Express.Router();



router.get("/get-blog", async (req, res) => {


  try {
    const blogs = await Blog.find().sort("name");



    res.status(200).json({message:"retrieved successfully",blogs});


  } catch (error) {

    res.send("error", error);
  }



});

router.get("/datail/:id", async (req, res) => {



  try {
    const blog = await Blog.findById(req.params.id);

    res.status(201).json({message:"single post successfully",blog});



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

    res.status(201).json({message:"Post created successfully",newblog});
  } catch (error) {
    console.log("Big error happening here", error)
    res.json({message:"Internal error"});
  }
});

// updTE

router.put("/update/:id", async (req, res) => {


  // validate
 
  // const validation = validate(req.body);

  // if (validation.error) return res.status(400).send("all parameters should be  required ");


  try {

    console.log(req.params.id)
    const blog = await Blog.findByIdAndUpdate(req.params.id);

    blog.name = req.body.name;

    const updateBlog = await blog.save();

    res.status(201).json({message:"successfully updated" ,updateBlog});

   
  } catch (error) {
   console.log(error)
  }



  // let Course = blogs.find((c) => c.id === parseInt(req.params.id));


});

router.delete("/delete/:id",  async (req, res) => {


  const blog = await Blog.findByIdAndRemove(req.params.id);

  res.status(201).json({message:"successfully deleted" ,blog});




  if (!blog)
    return res.status(404).send("the post wuth the given id was not found ");

  res.send(blog);
});


// const validate = (blog) => {

//   const JoiSchema = Joi.object({ name: Joi.string().min(6).required() });

//   return JoiSchema.validate(blog);
// };

export default router;
