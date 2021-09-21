import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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

var UserModel = mongoose.model("users", userSchema);

export default UserModel;