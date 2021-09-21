import {
    getPosts,
    showCreatePost,
    createPost,
} from "../controllers/postController.js";
import express from "express";
const router = express.Router();

router.get("/", getPosts);
router.get("/create", showCreatePost);
export default router;