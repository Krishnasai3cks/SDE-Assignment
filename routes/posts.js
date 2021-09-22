import {
    getPosts,
    showCreatePost,
    createPost,
} from "../controllers/postController.js";

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("errors", "Please login");
    }
    res.redirect("/user/login");
}
import express from "express";
const router = express.Router();

router.get("/", getPosts);
router
    .route("/create")
    .get(ensureAuthenticated, showCreatePost)
    .post(ensureAuthenticated, createPost);

export default router;