import Router from "express";
import { addComment } from "../controllers/comment.controller.js";
import verifyJWT from "../middlewares/auth.mware.js";

const router = Router();

// Protected Routes
router.use(verifyJWT);
router.route("comment/:videoID").post(addComment);

export default router;
