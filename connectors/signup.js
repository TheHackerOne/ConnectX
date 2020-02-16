const user = require('../model/user');

exports.getSignUp = (req, res, next) => {
    res.render('signup', {
        pageTitle: "signup",
        text: null,
        error: false
    })
};

exports.postSignUp = (req, res, next) => {
    const user_name = req.body.name;
    const user_year = req.body.year;
    const user_email = req.body.email;
    const user_password = req.body.password;
    const User = new user({
        user_name: user_name,
        user_year: user_year,
        user_email: user_email,
        user_password: user_password
    });
    User.save()
    .then(result => {
        console.log("USER SUCCESSFULLY ADDDED TO THE DATABASE");
        res.redirect('/');
    })
    .catch(err => {
        console.log("userid already in use");
        res.render('signup', {
            pageTitle: 'signup',
            error: true,
            text: null
        })
    })
};