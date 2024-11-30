import express from "express";
import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";
import DBConnection from "./config/DB.Connect.js";
import UserRoutes from "./routes/user.routes.js";
import ExamRoutes from "./routes/exam.routes.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", UserRoutes);
app.use("/api/exam", ExamRoutes);
app.listen(process.env.PORT, async () => {
  console.log("Our App is working on " + process.env.PORT);
  await DBConnection();
});
