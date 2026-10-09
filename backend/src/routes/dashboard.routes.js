
import express from "express";

import Course from "../models/Course.js";
import Student from "../models/Student.js";
import Order from "../models/Order.js";

import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", adminAuth, async (req, res) => {
  try {
    const [
      totalCourses,
      activeCourses,
      totalStudents,
      paidStudents,
      pendingStudents,
      failedStudents,
      revenueResult,
    ] = await Promise.all([
      Course.countDocuments(),

      Course.countDocuments({
        status: true,
      }),

      Student.countDocuments(),

      Student.countDocuments({
        paymentStatus: "paid",
      }),

      Student.countDocuments({
        paymentStatus: "pending",
      }),

      Student.countDocuments({
        paymentStatus: "failed",
      }),

      Order.aggregate([
        {
          $match: {
            status: "paid",
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: "$amount",
            },
          },
        },
      ]),
    ]);

    const totalRevenue = revenueResult[0]?.total ?? 0;

    res.json({
      success: true,
      totalCourses,
      activeCourses,
      totalStudents,
      paidStudents,
      pendingStudents,
      failedStudents,
      totalRevenue,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
    });
  }
});

export default router;
