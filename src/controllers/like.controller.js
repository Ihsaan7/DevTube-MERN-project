import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Like from "../models/like.model.js";
import Video from "../models/video.model.js";
import mongoose from "mongoose";

const likeVideo = asyncHandler(async (req, res) => {
  // Get params
  const { videoID } = req.params;
  if (!videoID || !mongoose.isValidObjectId(videoID)) {
    throw new ApiError(400, "Invalid Video ID!");
  }

  // Fetch Video
  const video = await Video.findById(videoID);
  if (!video) {
    throw new ApiError(404, "Cannot Found the Video!");
  }

  // Check for already liked or not
  const alreadyLiked = await Like.findOne({
    video: videoID,
    likedBy: req.user?._id,
  });

  let message;
  let isLiked;

  if (alreadyLiked) {
    await Like.findByIdAndDelete(alreadyLiked._id);
    message = "Video unliked";
    isLiked = false;
  } else {
    await Like.create({
      video: videoID,
      likedBy: req.user?._id,
    });
    message = "Video Liked";
    isLiked = true;
  }

  return res.status(200).json(new ApiResponse(200, { isLiked }, message));
});

export { likeVideo };
