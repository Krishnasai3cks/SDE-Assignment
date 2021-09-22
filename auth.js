import passport from "passport";
import bcrypt from "bcrypt";
import LocalStrategy from "passport-local";
import ObjectID from "ObjectID";
import { Router } from "express";
const app = Router();
import UserModel from "./models/user.js";
export const authenticate = () => {
    // Serialization and deserialization here...
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async(id, done) => {
        const user = await UserModel.findOne({ _id: new ObjectID(id) });
        done(null, user);
    });

    // strategy
    passport.use(
        new LocalStrategy(async(username, password, done) => {
            try {
                const user = await UserModel.findOne({ username });
                const passwordCheck = await bcrypt.compare(password, user.password);
                if (!user) {
                    return done(null, false);
                }
                if (!passwordCheck) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                console.log(error);
            }
        })
    );
};