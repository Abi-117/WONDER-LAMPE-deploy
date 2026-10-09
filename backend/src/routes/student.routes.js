import express from "express";
import Student from "../models/Student.js";
import { adminAuth } from "../middleware/adminAuth.js";


const router = express.Router();



// GET ALL STUDENTS — ADMIN
router.get("/", adminAuth, async (req, res) => {
  try {
    const students = await Student.find()
      .populate("courseId", "courseName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Fetch students error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch students",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      fullName,
      mobile,
      email,
      city,
      whatsappNumber,
      experienceLevel,
      courseId,
    } = req.body;

    if (!fullName || !mobile || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name, mobile and email are required",
      });
    }

    const student = await Student.create({
      fullName,
      mobile,
      email,
      city,
      whatsappNumber,
      experienceLevel,
      courseId,
    });

    res.status(201).json({
      success: true,
      student,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;