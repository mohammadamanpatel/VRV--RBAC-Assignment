import examModel from "../models/exam.model.js";

// Create a new exam (Only for Instructors)
export const createExam = async (req, res) => {
  console.log("req.body", req.body);
  const { title, questions } = req.body;

  try {
    if (req.user.role !== "Instructor") {
      return res
        .status(403)
        .json({ message: "Access denied: Only instructors can create exams" });
    }

    const exam = new examModel({
      title,
      questions,
      instructorId: req.user.id,
    });

    await exam.save();
    res.status(201).json({ message: "Exam created successfully", exam });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all exams (Admins can view all; Students/Instructors only their relevant exams)
export const getAllExams = async (req, res) => {
  try {
    let exams;

    if (req.user.role === "Admin") {
      exams = await examModel.find(); // Admins can view all exams
    } else if (req.user.role === "Instructor") {
      exams = await examModel.find({ instructorId: req.user.id }); // Instructors see only their exams
    } else if (req.user.role === "Student") {
      exams = await examModel.find(); // Students can view all exams (you can filter further if needed)
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json({ message: "Exam fetched successfully", exams: exams });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get a single exam by ID (All roles can access)
export const getExamById = async (req, res) => {
  console.log("req.params", req.params);
  const { id } = req.params;

  try {
    const exam = await examModel
      .findById(id)
      .populate("instructorId", "name email");
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    res.json({ exam });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update an exam (Only the instructor who created the exam)
export const updateExam = async (req, res) => {
  console.log("req.params in update exam", req.params);
  const { id } = req.params;
  console.log("req.body",req.body)
  const { title, questions } = req.body;

  try {
    const exam = await examModel.findById(id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    if (
      req.user.role !== "Instructor" ||
      exam.instructorId.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: Unauthorized to update this exam" });
    }

    exam.title = title || exam.title;
    exam.questions = questions || exam.questions;

    await exam.save();
    res.json({ message: "Exam updated successfully", exam });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete an exam (Only the instructor who created the exam)
export const deleteExam = async (req, res) => {
  const { id } = req.params;

  try {
    const exam = await examModel.findById(id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    if (
      req.user.role !== "Instructor" ||
      exam.instructorId.toString() !== req.user.id
    ) {
      return res
        .status(403)
        .json({ message: "Access denied: Unauthorized to delete this exam" });
    }

    await exam.deleteOne();
    res.json({ message: "Exam deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Submit an exam (Only for Students)
export const submitExam = async (req, res) => {
  const { id } = req.params; // Exam ID
  const { answers } = req.body; // Answers from the student

  try {
    if (req.user.role !== "Student") {
      return res
        .status(403)
        .json({ message: "Access denied: Only students can submit exams" });
    }

    const exam = await examModel.findById(id);
    if (!exam) return res.status(404).json({ message: "Exam not found" });

    // Calculate score
    let score = 0;
    exam.questions.forEach((question, index) => {
      if (question.correctAnswer === answers[index]) score++;
    });

    res.json({ message: "Exam submitted successfully", score });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
