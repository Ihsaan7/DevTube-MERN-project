import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { uploadMulter } from "../middlewares/multer.mware.js";

const router = Router();

// User routes
router.route("/signup").post(
  uploadMulter.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

export default router;
