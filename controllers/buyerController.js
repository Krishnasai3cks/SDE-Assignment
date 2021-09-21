let client = require("../db");
const User = require("../models/User");
const Buyer = require("../models/Buyer");
const buyersCollection = client.db().collection("buyers");
const multer = require("multer");
const mime = require("mime");
const fs = require("fs");
const { ObjectID } = require("mongodb");

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        let path_to_upload = process.cwd() + "\\uploads\\commodity\\" + req.body.id;
        try {
            let statsObj = fs.statSync(path_to_upload);
        } catch {
            fs.mkdirSync(path_to_upload);
        }
        callback(null, path_to_upload);
    },
    filename: function(req, file, callback) {
        callback(
            null,
            file.originalname + Date.now() + "." + mime.extension(file.mimetype)
        );
    },
});
var upload = multer({ storage: storage }).array("commodityphoto", 10);

exports.pageBuyers = function(req, res) {
    let user = new User(req.user);
    buyersCollection.find({}).toArray((err, data) => {
        if (!data) {
            res.error(404);
        } else {
            res.render("page-buyers", {...req.user, buyersList: data });
        }
    });
};

exports.buyersList = function(req, res) {
    let user = new User(req.user);
    buyersCollection.find({}).toArray((err, data) => {
        if (!data) {
            res.error(404);
        } else {
            res.render("add-new-orders", {...req.user, buyersList: data });
        }
    });
};

exports.createBuyer = function(req, res) {
    let buyer = new Buyer(req.body, req.user._id);
    buyer
        .createBuyer()
        .then(function() {
            req.flash("success", "Buyer added successfully");
            req.session.save(() => res.redirect("/page-buyers"));
        })
        .catch(function(errors) {
            errors.forEach((error) => req.flash("errors", errors));
            req.session.save(() => res.redirect("/page-buyers"));
        });
};

exports.addNewOrders = function(req, res) {
    let user = new User(req.user);

    upload(req, res, (err) => {
        if (err) {
            console.log(err);
            req.flash("Error uploading files");
            res.end("Error uploading files");
        }
        buyersCollection
            .find({ _id: ObjectID(req.body.id) })
            .toArray((err, result) => {
                res.render("confirm-order-details", {
                    buyer: result,
                    orderDetails: req.body,
                    user: req.user,
                });
            });
    });
};
exports.viewSingleContact = async function(req, res) {
    try {
        let buyer = await Buyer.findSingleById(req.params.id, req.visitorId);
        if (buyer) {
            res.render("viewSingleContact", { buyer: buyer });
        }
    } catch {
        res.render("404");
    }
};

exports.orderConfirmPage = async function(req, res) {
    try {
        let buyer = await Buyer.findSingleById(req.params.id, req.visitorId);
        if (buyer) {
            res.render("confirm-order-details", {
                ...req.user,
                buyersList: data,
                buyer: buyer,
            });
        }
    } catch {
        res.render("404");
    }
};

//60af45a336456a511c36ef66