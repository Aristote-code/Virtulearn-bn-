import express from "express";
import {
  getAllUsers,
  getAllStudents,
  getAllMentors,
  getOneUser,
} from "../controllers/users.controller.js";

const router = express.Router();

//  /user/all
router.get("/all", getAllUsers);

//  /user/students
router.get("/students", getAllStudents);

//  /user/mentors
router.get("/mentors", getAllMentors);

//  /user/:id
router.get("/:id", getOneUser);

export default router;
