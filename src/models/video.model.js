import mongoose, { mongo } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: [true, "VideoFile is required for DB"],
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required for DB"],
    },
    title: {
      type: String,
      required: [true, "Title is required for DB"],
    },
    description: {
      type: String,
      required: [true, "Description is required for DB"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required in DB"],
    },
    view: {
      type: Number,
      required: true,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      required: [true, "Publish Value required in DB"],
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

const Video = mongoose.model("Video", videoSchema);
export default Video;
