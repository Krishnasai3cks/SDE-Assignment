import { getPosts } from "../controllers/marketplaceController.js";
import express from "express";
const router = express.Router();

router.get("/", getPosts);

export default router;