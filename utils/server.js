import helmet from "helmet";
import express from "express";

const createServer =()=>{
    const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

return app;
} 
export default createServer