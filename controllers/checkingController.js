import UserModel from "../models/user.js";
export const checkUsername = async(req, res) => {
    let user = await UserModel.findOne({ username: req.params.username });
    if (user) res.status(200).send("username already exists");
};
export const checkPhone = async(req, res) => {
    let user = await UserModel.findOne({ phone: req.params.phone });
    if (user) res.status(200).send("phone already exists");
};
export const checkEmail = async(req, res) => {
    let user = await UserModel.findOne({ email: req.params.email });
    if (user) res.status(200).send("email already exists");
};