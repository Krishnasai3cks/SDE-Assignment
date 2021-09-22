import express from "express";
import PostModel from "../models/posts.js";
const router = express.Router();

export const getPosts = async function(req, res) {
    try {
        const posts = await PostModel.find();

        res.status(200).render("posts/index", { posts });
    } catch (error) {
        console.log(error);
    }
};
export const showCreatePost = (req, res) => {
    res.render("posts/page-create-post", { user: req.user });
};
export const createPost = async(req, res) => {
    try {
        const post = req.body;
        post.username = req.user.username;
        const newpost = await PostModel.create(post);
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
};
export default router;