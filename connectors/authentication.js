const user = require("../model/user");


exports.getSignUp = (req, res, next) => {
    res.render("signup", {
        pageTitle: "signup",
        text: null,
        error: false
    });
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
        res.redirect("/");
        })
        .catch(err => {
        console.log("userid already in use");
        res.render("signup", {
            pageTitle: "signup",
            error: true,
            text: null
        });
        });
    };

exports.postSignIn = (req, res, next) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

    user
        .findOne({ user_email: user_email, user_password: user_password })
        .then(user => {
        if (user) {
            // console.log(user._id.toString());
            req.session.isloggedin = true;
            const url = `/credentials/${user._id}`;
            console.log(url);
            res.redirect(url);
        } else {
            res.render("signup", {
            pageTitle: "Signin",
            text: "NO USER FOUND!! TRY SIGNUP ->",
            error: false
            });
        }
        })
        .catch(err => {
        console.log(err);
        });
};    

exports.getCredentials = (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    res.render("user-profile/credentials.ejs", {
        id: userId,
        isloggedin: req.session.isloggedin
    });
};