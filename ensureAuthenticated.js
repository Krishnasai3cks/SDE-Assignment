export default function ensureAuthenticated(req, res, next) {
  console.log(req);

  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash("errors", "Please login");
  }
  res.redirect("/user/login");
}
