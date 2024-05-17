import User from "../models/user.model.js";

export async function getAllUsers(req, res) {
  try {
    // Get current user from validateToken.js
    const currentUser = req.user._id;

    // Get all users except the current user
    const users = await User.find().select("-password");

    // Return all users
    return res.status(200).json(users);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllStudents(req, res) {
  try {
    // Get all students
    const students = await User.find({ isMentor: false }).select("-password");

    // Return all students
    return res.status(200).json(students);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getAllMentors(req, res) {
  try {
    // Get all mentors
    const mentors = await User.find({ isMentor: true }).select("-password");

    // Return all mentors
    return res.status(200).json(mentors);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function getOneUser(req, res) {
  try {
    // Get user ID from URL
    const { id } = req.params;

    // Get user by ID
    const user = await User.findById(id).select("-password");

    // Return user
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export async function updateProgress(req, res) {
  try {
    const { courseId } = req.params;
    const userId = req.user._id;

    const user = await User.findById(userId);

    const courseProgress = user.courseProgresses.find(
      (progress) => progress.courseId.toString() === courseId
    );
    courseProgress.completedLessons += 1;
    await user.save();

    // Return updated user
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
}
