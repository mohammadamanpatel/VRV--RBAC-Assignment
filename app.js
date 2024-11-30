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
app.get("/api/docs", (req, res) => {
  res.redirect("https://www.postman.com/joint-operations-cosmologist-64352344/workspace/exam-system-endpoints/collection/30730048-f9511483-07ec-40e6-ad90-ae8352cb0c45?action=share&creator=30730048");
});
app.listen(process.env.PORT, async () => {
  console.log("Our App is working on " + process.env.PORT);
  await DBConnection();
});
