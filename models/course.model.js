import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: "Content",
        default: [],
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    discussions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Discussion",
        default: [],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = model("Course", courseSchema);

export default Course;
