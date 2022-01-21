import mongoose from "mongoose";




const messageSchema = new mongoose.Schema({
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
  message: {
    type: String,

    required: true,
    minlength: 5,
    maxlength: 1024,
  },
  
});


// end here

const Message = mongoose.model("Message", messageSchema);
export default Message;
