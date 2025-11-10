import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import Video from "../models/video.model.js";
import { uploadCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";

const uploadVideo = asyncHandler(async (req, res) => {
  // Get data
  const { title, description } = req.body;
  if (!(title && description)) {
    throw new ApiError(400, "Both fields are required!");
  }

  // Get the files
  const videoFileLocalPath = req.files?.videoFile?.[0]?.path;
  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  if (!videoFileLocalPath || !thumbnailLocalPath) {
    throw new ApiError(400, "Video file and thumbnail are required!");
  }

  // Check file size (5MB = 5 * 1024 * 1024 bytes)
  const videoFileSize = req.files?.videoFile?.[0]?.size;
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (videoFileSize > maxSize) {
    throw new ApiError(400, "Video size must be less than 5MB!");
  }

  // Upload on Cloudi
  const videoFile = await uploadCloudinary(videoFileLocalPath);
  const thumbnail = await uploadCloudinary(thumbnailLocalPath);

  // Get URL and duration
  const videoUrl = videoFile.url;
  const videoDuration = videoFile.duration;
  const thumbnailUrl = thumbnail.url;

  // Create video in DB
  const video = await Video.create({
    title,
    description,
    videoFile: videoUrl,
    duration: videoDuration,
    thumbnail: thumbnailUrl,
    owner: req.user._id,
  });

  // Return res as video
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded Successfully"));
});

export { uploadVideo };
