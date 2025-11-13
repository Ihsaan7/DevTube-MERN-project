import Router from "express";
import verifyJWT from "../middlewares/auth.mware.js";
import {
  getAllSubbedChannel,
  toggleSubscribe,
} from "../controllers/subs.controller.js";

const router = Router();

router.use(verifyJWT);
// Protected Route

router.route("/toggle-subscribe/:channelID").post(toggleSubscribe);

router.route("/get-all-subbed-channel/:channelID").get(getAllSubbedChannel);

export default router;
