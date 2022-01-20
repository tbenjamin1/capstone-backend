import mongoose from "mongoose";

// schema for our database

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  summary: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250,
  },
  author: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isPushlished: Boolean,
},{timestamps:true});

// end here

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
