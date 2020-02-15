exports.getHomepage = (req, res, next) => {
    res.render('homepage/homepage', {
        pageTitle: "ConnectX"
    });
};