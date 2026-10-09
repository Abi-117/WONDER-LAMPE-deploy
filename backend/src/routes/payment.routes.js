import express from "express";
import crypto from "crypto";

import razorpay from "../config/razorpay.js";
import Student from "../models/Student.js";
import Course from "../models/Course.js";
import Order from "../models/Order.js";
import SiteSettings from "../models/SiteSettings.js";
import { adminAuth } from "../middleware/adminAuth.js";


const router = express.Router();


// CREATE RAZORPAY ORDER
router.post("/create-order", async (req, res) => {
  try {
    const { studentId, courseId, paymentType = "program" } = req.body;

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    let amount;
    let finalCourseId = courseId || null;

    // MAIN PROGRAM PAYMENT
    if (paymentType === "program") {
      const settings = await SiteSettings.findOne();

      if (!settings) {
        return res.status(404).json({
          success: false,
          message: "Program settings not found",
        });
      }

      amount = settings.programPrice * 100;
    }

    // COURSE PAYMENT
    else {
      if (!courseId) {
        return res.status(400).json({
          success: false,
          message: "Course ID is required",
        });
      }

      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      amount = course.price * 100;
    }

    const razorpayOrder = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const order = await Order.create({
      studentId,
      courseId: finalCourseId,
      razorpayOrderId: razorpayOrder.id,
      amount: amount / 100,
      status: "created",
    });

    return res.status(201).json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      publicKey: process.env.RAZORPAY_KEY_ID,
      dbOrderId: order._id,
    });
  } catch (error) {
    console.error("Create Razorpay order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    });
  }
});


// VERIFY PAYMENT
router.post("/verify", async (req, res) => {
  try {
    const {
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    if (
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing Razorpay payment details",
      });
    }

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpayOrderId}|${razorpayPaymentId}`
      )
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    const order = await Order.findOne({
      razorpayOrderId,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.status === "paid") {
  return res.status(200).json({
    success: true,
    message: "Payment already verified",
    orderId: order._id,
    studentId: order.studentId,
  });
}

    order.razorpayPaymentId = razorpayPaymentId;
    order.status = "paid";

    await order.save();

    const student = await Student.findById(
      order.studentId
    );

    if (student) {
      student.paymentStatus = "paid";
      await student.save();
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: order._id,
      studentId: order.studentId,
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
});



// GET ALL PAYMENTS — ADMIN
router.get("/", adminAuth, async (req, res) => {
  try {
    const payments = await Order.find()
      .populate("studentId", "fullName email mobile")
      .populate("courseId", "courseName")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      payments,
    });
  } catch (error) {
    console.error("Fetch payments error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch payments",
    });
  }
});
export default router;