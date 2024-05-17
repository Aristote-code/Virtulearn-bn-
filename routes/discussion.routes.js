import express from "express";
import {
  createBlogDiscussion,
  likeDiscussion,
  createCourseDiscussion,
} from "../controllers/discussion.controller.js";

const router = express.Router();

//create a new blog discussion
router.post("/blog/:id", createBlogDiscussion);

//create a new course discussion
router.post("/course/:id", createCourseDiscussion);

//like a discussion
router.patch("/:id", likeDiscussion);

export default router;
