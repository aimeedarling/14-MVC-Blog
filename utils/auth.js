//auth middleware -use before routes if auth required - doesn't 
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect("/login");
    } else {
        next();
    }
};

module.exports = withAuth;