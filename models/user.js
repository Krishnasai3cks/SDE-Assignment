import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    fullname: String,
    username: String,
    phone: String,
    email: String,
    password: String,
    nameOfBusiness: {
        type: String,
        default: "",
    },
    GSTIN: {
        type: String,
        default: "",
    },
    location: {
        type: String,
        default: "",
    },
});

var UserModel = mongoose.model("UserModel", postSchema);

export default UserModel;