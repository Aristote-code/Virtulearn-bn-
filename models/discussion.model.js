import mongoose, { Schema } from "mongoose";

const DiscussionSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
});

const Discussion = mongoose.model("Discussion", DiscussionSchema);

export default Discussion;
