import User from "../../modals/users";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";





describe("user.generateAuthToken", () => {



  it("should return a valid JWT", () => {

    
    const payload = {
      _id: new mongoose.Types.ObjectId().toHexString(),

      // isAdmin: true,
    };


    const user = new User(payload);
    console.log(payload);
    const token = user.generateAuthToken();

    const validToken = jwt.verify(token, "UsersAuth");

    console.log(validToken);

    expect({ _id: validToken.id }).toMatchObject(payload);



  });
});
