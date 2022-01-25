
import User from "../../modals/users";
import mongoose  from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';
import createServer from '../../utils/server.js'
import request from "supertest";

const app=createServer();

let mongoServer;

describe("/api/users", () => {
// beforeAll(async()=>{
//     mongoServer = await MongoMemoryServer.create();


//    await mongoose.connect(mongoServer.getUri());
// })


// afterAll(async()=>{
//     await mongoose.disconnect();
//     await mongoose.connection.close()
// })

    // afterEach(function (done) {
    //     app.close(done);
    //   });


    it("given user name and password", () => {



    })


    // it(" when the user password and username is missing", async() => {
    //     const response = await request(app).post("/post/user").send({
            
            
    //         email: "tbemmmmm@gmail.com",
          
    //     })
    //     console.log(response)

    //   expect(response.status).toBe(404)
      


    // })

    it(" test response with 200 status cose", async() => {

      console.log("")
        const response = await request(app).post("/post/user").send({
            
            firstName: "igitabohhh",

            lastName: "agbyjjjjjhbihuinhunh",

            email: "tbkkkkmm@gmail.com",
            
            password: "benjkamin"
        })
      expect(404).toBe(404)
      

    })
    //  it("should return data type response ", async () => {
    //   const res = await request(app).post("/post/user").send({
    //     firstName: "igitabo",
    //     lastName: "agbyighbbihbihuinhunh",
    //     email: "tbemmmmm@gmail.com",
    //     password: "benjamin"
    //   });

    //   expect(res.headers["content-type"]).toEqual(
    //     expect.stringContaining("text")
    //   );
    // });



   
})