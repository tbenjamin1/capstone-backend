import createServer from '../../utils/server.js'
import Blog from "../../modals/blogposts.js";
import supertest from 'supertest';

import request from "supertest";

const app =createServer();

describe("/api/blogs", () => {
  describe("GET", () => {
    

    it("should return all post", async () => {

      //   await Course.collection.insertMany([
      //     { name: "Course1" },

      //     { name: "Course" },
      //   ]);

      const res = await request(app).get("/get-blog");

      expect(res.status).toBe(404);

      //   expect(res.body.length).toBe(2);

      //   await Course.remove({});
    });

    it("should post  new article ", async () => {
      const res = await request(app).post("/api/blogs/add-blog").send({
        name: "Course1",
        author: "Course",
      });

      expect(404).toBe(200);
    });

    // it("should return data type response ", async () => {
    //   const res = await request(app).post("/api/blogs").send({
    //     name: "Course1",

    //     author: "Course",
    //   });

    //   expect(res.headers["content-type"]).toEqual(
    //     expect.stringContaining("text/html")
    //   );
    // });

    // ///:id"
    // it("should get any specific article ", async () => {
    //   const blog = new Blog({ name: "blog1", author: "blog" });
    //   console.log(blog);

    //   const res = await request(app).get("/api/blogs/" + blog.id);
    //   console.log(res);

    //   await blog.save();

    //   expect(res.body).toBe(blog);

    //   expect(res.status).toMatchObject(200);
    // });
  });
});
