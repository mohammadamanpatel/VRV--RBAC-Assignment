import express from "express";
import { verifyToken } from "../middlewares/Auth.middleware.js";
import { authorizeRole } from "../middlewares/Role.middleware.js";
import {
  createExam,
  deleteExam,
  getAllExams,
  getExamById,
  submitExam,
  updateExam,
} from "../controllers/exam.controller.js";

const router = express.Router();

//routes for exam management

//route for creating exam
router.post("/create", verifyToken, authorizeRole(["Instructor"]), createExam);

//route for getting all exams
router.get(
  "/",
  verifyToken,
  authorizeRole(["Admin", "Instructor", "Student"]),
  getAllExams
);

//route for getting exam by a ExamID
router.get(
  "/:id",
  verifyToken,
  authorizeRole(["Admin", "Instructor", "Student"]),
  getExamById
);

//route for updating the exam via ExamID
router.put("/:id", verifyToken, authorizeRole(["Instructor"]), updateExam);

//route for deleting the exam via ExamID
router.delete("/:id", verifyToken, authorizeRole(["Instructor"]), deleteExam);

//route for submit the exam via ExamID
router.post("/:id/submit", verifyToken, authorizeRole(["Student"]), submitExam);

export default router;
