import mongoose from "mongoose";

// schema for our database

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  author: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isPushlished: Boolean,
});

// end here

const Course = mongoose.model("Course", courseSchema);
export default Course;
