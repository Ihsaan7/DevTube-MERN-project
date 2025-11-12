import Router from "express";
import verifyJWT from "../middlewares/auth.mware.js";
import { likeVideo } from "../controllers/like.controller.js";

const router = Router();

router.use(verifyJWT);
//Protected Routes

router.route("/like-video/:videoID").post(likeVideo);

export default router;
