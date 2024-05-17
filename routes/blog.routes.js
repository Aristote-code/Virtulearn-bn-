import { Router } from "express";
import {
  getAllBlogs,
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import validateToken from "../guards/validateToken.js";

const router = Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog);
router.post("/", validateToken, createBlog);
router.patch("/:id", validateToken, updateBlog);
router.delete("/:id", validateToken, deleteBlog);

export default router;
