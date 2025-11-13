import mongoose from "mongoose";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import Subs from "../models/subs.model.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const toggleSubscribe = asyncHandler(async (req, res) => {
  let message;
  let isSubscribed;
  // Get params
  const { channelID } = req.params;
  if (!channelID || !mongoose.isValidObjectId(channelID)) {
    throw new ApiError(400, "Invalid Channel ID!");
  }

  // Get Channel | User
  const user = await User.findById(channelID);
  if (!user) {
    throw new ApiError(404, "No channel found!");
  }

  // Check for own Channel Subs
  if (channelID === req.user?._id.toString()) {
    throw new ApiError(400, "You cannot subscribe to you own account!");
  }

  // Check for Already Subscribed
  const alreadySubed = await Subs.findOne({
    subscriber: req.user?._id,
    channel: channelID,
  });
  if (alreadySubed) {
    await Subs.findByIdAndDelete(alreadySubed._id);
    message = "Channel Unsubscribed Successfully";
    isSubscribed = false;
  } else {
    await Subs.create({
      subscriber: req.user?._id,
      channel: channelID,
    });
    message = "Channel Subscribed Successfully";
    isSubscribed = true;
  }

  // Count Subscriber
  const subscriberCount = await Subs.countDocuments({ channel: channelID });

  // return res
  return res
    .status(200)
    .json(new ApiResponse(200, { isSubscribed, subscriberCount }, message));
});

const getAllSubbedChannel = asyncHandler(async (req, res) => {
  // Get params
  const { channelID } = req.params;
  if (!channelID || !mongoose.isValidObjectId(channelID)) {
    throw new ApiError(400, "Invalid Channel ID!");
  }

  const { page = 1, limit = 10 } = req.query;
  const pageNumber = parseInt(page) || 1;
  const limitNumber = parseInt(limit) || 10;

  // Check for Channel | User exits
  const user = await User.findById(channelID);
  if (!user) {
    throw new ApiError(404, "User not found!");
  }

  // Pipeline
  const pipeline = [
    {
      $match: { channel: new mongoose.Types.ObjectId(channelID) },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscriber",
        foreignField: "_id",
        as: "subscriberDetails",
        pipeline: [
          {
            $project: {
              username: 1,
              fullName: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        subscriberDetails: { $first: "$subscriberDetails" },
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $project: {
        subscriber: "$subscriberDetails",
        subscribedAt: "$createdAt",
      },
    },
  ];

  // Pagination
  const options = {
    page: pageNumber,
    limit: limitNumber,
  };

  const result = await Subs.aggregatePaginate(
    Subs.aggregate(pipeline),
    options
  );

  // Return res
  return res
    .status(200)
    .json(new ApiResponse(200, result, "Subbed Channel Fetched Successfully"));
});
export { toggleSubscribe, getAllSubbedChannel };
