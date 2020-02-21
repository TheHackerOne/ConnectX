exports.getProfile = (req, res, next) => {
    res.render("user-profile/profile", {
        pageTitle: "username"
    });
};

