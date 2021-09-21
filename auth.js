import { serializeUser, deserializeUser, use } from "passport";
import { compareSync } from "bcrypt";
import LocalStrategy from "passport-local";
import ObjectID;
import { Router } from "express";
const app = Router();
const myDataBase = require("./db").db();
require("dotenv").config();
export default function() {
    // Serialization and deserialization here...
    serializeUser((user, done) => {
        done(null, user._id);
    });
    deserializeUser((id, done) => {
        myDataBase
            .collection("users")
            .findOne({ _id: new ObjectID(id) }, (err, doc) => {
                done(null, doc);
            });
    });

    // strategy
    use(
        new LocalStrategy({
                usernameField: "phone",
                passwordField: "password",
            },
            (phone, password, done) => {
                myDataBase
                    .collection("users")
                    .findOne({ phone: phone }, (err, user) => {
                        if (err) {
                            return done(err);
                        }
                        if (!user) {
                            return done(null, false);
                        }
                        if (!compareSync(password, user.password)) {
                            return done(null, false);
                        }

                        return done(null, user);
                        // strategy
                    });
            }
        )
    );
};