
import Joi from "joi";


import _ from "lodash";
import express from "express";

import Message from "../modals/message.js";

import validateToken from "../midleware/UserMiddleware.js";

const  router = express.Router();



router.get("/get-message", validateToken, async (req, res) => {
  try {
    const message = await Message.find().sort("name");
    res.status(201).json({message:"successfully Messages retrieved" ,message});
  } catch (error) {
    res.send("error", error);
  }
});

router.get("/get-message/:id", validateToken, async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({message:"successfully single Message retrieved" ,message});
  } catch (error) {
    res.send("error", error);
  }
});

router.post("/post/message", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send("all parameters should be required ");

  

 let message = new Message(

    _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "message",
      
    ])
  );

  



 try{
   const newMessage = await message.save();
  
  
   res.status(201).json({message:" message successfully sent",newMessage});
} catch (error) {
  console.log("Big error happening here", error)
  res.json({message:"Internal error"});
}

 



  
});

const validateUser = (userdata) => {
  const JoiSchema = Joi.object({
    firstName: Joi.string().min(6).max(50).required(),
    lastName: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    message: Joi.string().min(6).max(255).required(),
  });

  return JoiSchema.validate(userdata);
};


//delete
router.delete("/del/message/:id", validateToken, async (req, res) => {
  const message = await Message.findByIdAndRemove(req.params.id);

  if (!message)
    return res.status(404).send("the Message given id was not found ");

  res.json("Message deleted");
});

export default router;
