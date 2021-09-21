import session from "express-session";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import passport from "passport";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";
import auth from "./auth.js";
import cookieParser from "cookie-parser";
dotenv.config();
import postRoutes from "./routes/posts.js";
//another way of subbmitting data
let sessionOptions = session({
    secret: "java is cool",
    store: MongoStore.create({ mongoUrl: process.env.CONNECTION_URL }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
});
const app = express();
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");
app.use(sessionOptions);

app.use(flash());

app.use("/user", userRoutes);
app.use("/posts", postRoutes);
auth(app);

app.use(function(req, res, next) {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    //make  current user id available on all req obj
    if (req.session.user) {
        req.visitorId = req.session.user._id;
    } else {
        req.visitorId = 0;
    }
    // make user session data available from within view templates
    res.locals.user = req.session.user;
    next();
});
app.use("/", (req, res) => {
    res.send("In main route");
});
const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose
    .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() =>
        app.listen(PORT, () =>
            console.log(`Server Running on Port: http://localhost:${PORT}`)
        )
    )
    .catch((error) => console.log(`${error} did not connect`));