import UserModel from "../models/user.js";
import { hashSync } from "bcrypt";
import express from "express";
import { updatePost } from "../controllers/userController.js";
const router = express.Router();
import passport from "passport";
const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("errors", "Please login");
    }
    res.redirect("/page-login");
};
router.route("/").get(ensureAuthenticated, (req, res) => {
    res.render("index", req.user);
});

router.route("/update").post(ensureAuthenticated, updatePost);

router
    .route("/login")
    .post(
        passport.authenticate("local", { failureRedirect: "/page-register" }),
        (req, res) => {
            res.redirect("/page-profile");
        }
    );
router.route("/register").post(
    (req, res, next) => {
        let actual = req.body;
        const hash = hashSync(actual.password, 12);
        actual.password = hash;
        myDataBase
            .collection("users")
            .findOne({ phone: actual.phone }, (err, user) => {
                if (err) next(err);
                else if (user) res.redirect("/");
                else {
                    User.insertOne(actual, (err, doc) => {
                        console.log("checking", doc);
                        if (err) res.redirect("/");
                        else next(null, { _id: doc.insertedId, ...actual });
                    });
                }
            });
    },
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, next) => {
        res.redirect("/");
    }
);

router.route("/verify").post(
    (req, res, next) => {
        if (req.body.otp == req.session.otp) {
            let { password, phone, role } = req.session.curruser;
            let actual = req.session.curruser;
            const hash = hashSync(password, 12);
            actual.password = hash;
            myDataBase.collection("users").findOne({ phone: phone }, (err, user) => {
                if (err) next(err);
                else if (user) res.redirect("/");
                else {
                    myDataBase.collection("users").insertOne(actual, (err, doc) => {
                        if (err) res.redirect("/");
                        else next(null, doc.ops[0]);
                    });
                }
            });
        } else {
            req.flash("Authentication failed. Please use correct message");
            res.redirect("/page-register");
        }
    },
    passport.authenticate("local", { failureRedirect: "/" }),
    (req, res, next) => {
        res.redirect("/");
    }
);
router.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
});

export default router;