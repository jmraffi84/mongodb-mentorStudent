import express from "express";
import dotenv from "dotenv";
import cors from "cors"
import { mentorRouter } from "./Routes/mentor.js";
import { studentRouter } from "./Routes/student.js";

dotenv.config();

const PORT = process.env.PORT
const HOST = 'localhost';

const app = express();

app.use(express.json());
app.use(cors()) //to handle crossorigin error

// application middleware
app.use("/mentors", mentorRouter);
app.use("/students", studentRouter);


app.listen(PORT, HOST, () => console.log(`server started in local host:${PORT}`));