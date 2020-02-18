exports.getCredentials = (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    res.render("user-profile/credentials.ejs", {
        id: userId,
        isloggedin: req.session.isloggedin
    });
};