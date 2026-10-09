import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import courseRoutes from "./routes/course.routes.js";
import studentRoutes from "./routes/student.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import uploadRoutes from "./routes/upload.js";


const app = express();


// ===============================
// MIDDLEWARE
// ===============================

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());


// ===============================
// DATABASE
// ===============================

connectDB();


// ===============================
// TEST API
// ===============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Wonder Lampe API is running",
  });
});


// ===============================
// API ROUTES
// ===============================

app.use("/api/courses", courseRoutes);

app.use("/api/students", studentRoutes);

app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/upload", uploadRoutes);


// ===============================
// ERROR HANDLER
// ===============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
});


// ===============================
// SERVER
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});