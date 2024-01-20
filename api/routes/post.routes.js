import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import {
  createPost,
  displayPost,
  editPost,
  getPost,
} from "../controllers/post.controller.js";

const router = express.Router();
router.use(cookieParser());

router.use(
  cors({
    credentials: true,
    origin: "https://blog-website-e9wz1vpa3-srihari20031.vercel.app/",
    optionsSuccessStatus: 200,
  })
);

const uploadMiddeleware = multer({ dest: "uploads/" });

router.post("/post", uploadMiddeleware.single("file"), createPost);
router.get("/post", displayPost);
router.get("/post/:id", getPost);
router.put("/post", uploadMiddeleware.single("file"), editPost);

export default router;
