import PostModel from "../models/posts.js";
import mongoose from "mongoose";
import UserModel from "../models/user.js";
import passport from "passport";
import { hashSync } from "bcrypt";

export const updatePost = async(req, res) => {
    let response = req.body;
    let combined = {...req.user, ...req.body };
    if (req.user.password !== combined.password) {
        combined.password = hashSync(combined.password, 12);
    }
    const { id } = req.params;
    const newPost = req.body;

    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = {...newPost, _id: id };

    await PostModel.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
};

export const getLogin = (req, res) => {
    res.render("page-login");
};
export const getRegister = (req, res) => {
    res.render("page-register", {...req.user });
};
export const handleRegister = async(req, res, next) => {
    console.log("handleRegister");
    let actual = req.body;
    const hash = hashSync(actual.password, 12);
    actual.password = hash;
    const user = await UserModel.findOne({ phone: actual.phone });
    if (user) {
        res.redirect("/");
    } else {
        const inserted = await UserModel.create(actual);
        next(null, { _id: inserted._id, ...actual });
    }
};

export const handleLogout = (req, res) => {
    req.logout();
    res.redirect("/");
};

export const handleLoginAuthenticate = passport.authenticate("local", {
    failureRedirect: "/register",
});