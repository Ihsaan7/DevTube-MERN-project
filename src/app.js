import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import asyncHandler from "./utils/asyncHandler.js";
import ApiError from "./utils/apiError.js";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

//404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});
//Centralized Error Handler
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// //Health Check Route ( testing )
// app.get("/health", (req, res) => res.status(200).json({ ok: true }));
// // Testing Router for Error
// app.get(
//   "/test-error",
//   asyncHandler(async (req, res) => {
//     throw new ApiError(400, "This is a test Error");
//   })
// );

export default app;
