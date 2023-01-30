import express from "express";
import {
  addComment,
  deleteComment,
  getComment,
  updateComment,
} from "../controllers/comment.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, addComment);
router.delete("/:id",  verifyToken, deleteComment);
router.get("/:videoId",  getComment);
router.put("/:id", verifyToken, updateComment);
export default router;
