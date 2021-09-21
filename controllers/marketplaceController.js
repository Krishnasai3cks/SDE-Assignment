import express from "express";
import PostModel from "../models/posts.js";
const router = express.Router();

export const getPosts = async function(req, res) {
    try {
        const posts = await PostModel.find();

        res.status(200).json(JSON.stringify(posts));
    } catch (error) {
        console.log(error);
    }
};
export default router;