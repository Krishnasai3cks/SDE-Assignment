import express from "express";
import {
    getRegister,
    updatePost,
    handleRegister,
    handleLogout,
    handleLoginAuthenticate,
    getLogin,
} from "../controllers/userController.js";
import {
    checkUsername,
    checkPhone,
    checkEmail,
} from "../controllers/checkingController.js";
const router = express.Router();
import ensureAuthenticated from "../ensureAuthenticated.js";
router.get("/", (req, res) => {
    res.send("In user route");
});
router.route("/update").post(ensureAuthenticated, updatePost);

router
    .route("/login")
    .get(getLogin)
    .post(handleLoginAuthenticate, (req, res, next) => {
        res.redirect("/");
    });
router
    .route("/register")
    .get(getRegister)
    .post(handleRegister, handleLoginAuthenticate, (req, res, next) => {
        next();
    });

router.get("/usernamecheck:username", checkUsername);
router.get("/phonecheck:phone", checkPhone);
router.get("/emailcheck:email", checkEmail);
router.route("/logout").get(ensureAuthenticated, handleLogout);
export default router;