const User = require("../model/user");


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
                error: true
            })
        }
        const newUser = new User({
        name: user_name,
        year: user_year,
        email: user_email,
        password: user_password
        });
        newUser.save()
            .then(result => {
            console.log("USER SUCCESSFULLY ADDDED TO THE DATABASE");
            res.redirect("/login");
            })
            .catch(err => {
            console.log(err);
            });
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