import passport from "passport";
import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";
import ObjectID from "ObjectID";
import { Router } from "express";
const app = Router();
import UserModel from "./models/user.js";
export default function(app) {
    // Serialization and deserialization here...
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser((id, done) => {
        done(null, UserModel.findOne({ _id: new ObjectID(id) }));
    });

    // strategy
    passport.use(
        new LocalStrategy({
                usernameField: "username",
                passwordField: "password",
            },
            async(username, password, done) => {
                try {
                    const user = await UserModel.findOne({ username });
                    console.log(user.username);
                    if (!user) {
                        return done(null, false);
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false);
                    }
                    return done(null, user);
                } catch (error) {
                    console.log(error);
                }
            }
        )
    );
}
export const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash("errors", "Please login");
    }
    res.redirect("/page-login");
};