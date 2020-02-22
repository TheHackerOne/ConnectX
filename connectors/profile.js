const Profile = require("../model/profile");

exports.getProfile = (req, res, next) => {
    const userId = req.params.userId;
    Profile.findOne({ userId: userId })
        .then(profile => {
        if (!profile) {
            return res.redirect("/");
        }
        console.log(profile);
        return res.render("user-profile/profile", {
            pageTitle: profile.firstName,
            profile: profile
        });
        })
        .catch(err => {
        console.log(err);
        });
};
