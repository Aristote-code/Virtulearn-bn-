import mongoose from "mongoose";

const courseProgressSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  completedLessons: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("CourseProgress", courseProgressSchema);
