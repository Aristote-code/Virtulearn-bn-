import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourse,
  enrollCourse,
} from "../controllers/course.controller.js";

const router = Router();

router.get("/", getAllCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.post("/enroll/:id", enrollCourse);
router.delete("/:id", deleteCourse);
export default router;
