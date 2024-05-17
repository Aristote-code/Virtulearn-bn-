import { Router } from "express";
import {
  deleteContent,
  createContent,
  getAllContent,
  getContent,
} from "../controllers/content.controller.js";

const router = Router();
router.get("/", getAllContent);
router.get("/:id", getContent);
router.post("/", createContent);
router.delete("/:id", deleteContent);
export default router;
