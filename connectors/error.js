
exports.error = (req, res, next) => {
    res.render('error', {
        pageTitle: "404 NOT FOUND"
    })
};