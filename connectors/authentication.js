const User = require("../model/user");
const bcrypt = require('bcrypt');


exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        pageTitle: "signup",
        error: false
    });
};

exports.postSignUp = (req, res, next) => {
    const user_name = req.body.name;
    const user_year = req.body.year;
    const user_email = req.body.email;
    const user_password = req.body.password;
    User.findOne({email: user_email})
    .then(user => {
        if(user){
            return res.render('auth/signup',{
                pageTitle: 'signup',
                error: true
            })
        }
        bcrypt.hash(user_password, 12)
        .then(hashedPassword => {
            const newUser = new User({
                name: user_name,
                year: user_year,
                email: user_email,
                password: hashedPassword
            });
            newUser
                .save()
                .then(result => {
                    console.log("USER SUCCESSFULLY ADDDED TO THE DATABASE");
                    res.redirect("/login");
                })
                .catch(err => {
                    console.log(err);
                });
        })
        .catch(err => {
            console.log(err);
        })
    })
    .catch(err => console.log(err))
}
    
exports.getLogIn = (req, res, next) => {
    res.render("auth/login", {
        pageTitle: "Login",
        error: false
    });
};

exports.postLogIn = (req, res, next) => {
    const user_email = req.body.email;
    const user_password = req.body.password;

    User
        .findOne({ email: user_email })
        .then(user => {
            if (!user) {
                return res.render("auth/login", {
                    pageTitle: "login",
                    error: true
                });
            }
            const pass = user.password;
            bcrypt.compare(user_password, pass)
            .then(doMatch => {
                if(doMatch){
                    req.session.isloggedin = true;
                    req.session.user = user;
                    return res.redirect("/credentials");
                }
                return res.render("auth/login", {
                    pageTitle: "login",
                    error: true
                });

            })
            .catch(err => console.log(err));    
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