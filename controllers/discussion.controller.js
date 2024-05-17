import Discussion from "../models/discussion.model.js";
import Blog from "../models/blog.model.js";
import Course from "../models/course.model.js";

// create a new discussion
export async function createBlogDiscussion(req, res) {
  const blogId = req.params.id;
  const { content } = req.body;
  const authorId = req.user._id;

  try {
    // check if the blog exists
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    // create a new discussion
    const newDiscussion = await Discussion.create({
      content,
      author: authorId,
    });
    // save the discussion in the blog
    blog.discussions.push(newDiscussion._id);
    await blog.save();

    // return the saved discussion
    return res.status(201).json(newDiscussion);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

// create course discussion
export async function createCourseDiscussion(req, res) {
  const courseId = req.params.id;
  const { content } = req.body;
  const authorId = req.user._id;

  try {
    // check if the Course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // create a new discussion
    const newDiscussion = await Discussion.create({
      content,
      author: authorId,
    });

    // save the discussion in the Course
    course.discussions.push(savedDiscussion._id);
    await course.save();

    // return the saved discussion
    return res.status(201).json(savedDiscussion);
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: "Internal server Error" });
  }
}

// like a discussion
export async function likeDiscussion(req, res) {
  const { discussionId } = req.params;
  const userId = req.user._id;

  try {
    // check if the discussion exists
    const discussion = await Discussion.findById(discussionId);
    if (!discussion) {
      return res.status(404).json({ error: "Discussion not found" });
    }

    // check if the user has already liked the discussion
    if (discussion.likes.includes(userId)) {
      return res
        .status(400)
        .json({ error: "You have already liked this discussion" });
    }

    // like the discussion
    discussion.likes.push(userId);
    await discussion.save();

    return res.status(200).json({ message: "Discussion liked successfully" });
  } catch (error) {
    console.log("Error", error);
    return res.status(500).json({ error: "Internal server Error" });
  }
}
