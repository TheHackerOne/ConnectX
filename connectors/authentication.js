const User = require("../model/user");
const Profile = require("../model/profile");
const bcrypt = require('bcrypt');


exports.getSignUp = (req, res, next) => {
    res.render("auth/signup", {
        pageTitle: "signup",
        error: false
    });
};

exports.postSignUp = (req, res, next) => {
    const user_name = req.body.name;
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
    res.render("auth/credentials.ejs", {
        id: userId,
        isloggedin: req.session.isloggedin,
        error: false
    });
};

exports.postCredentials = (req, res, next) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNo = req.body.phoneNo;
    const image = req.file;
    const year = req.body.year;
    const password = req.body.password;
    const userName = req.body.userName;
    const imageUrl = image.path;
    console.log(imageUrl);

    bcrypt.compare(password, req.session.user.password)
        .then(doMatch => {
            if(doMatch){
            const profile = new Profile({
                firstName: firstName,
                lastName: lastName,
                year: year,
                imagePath: imageUrl,
                userName: userName,
                phoneNo: phoneNo,
                userId: req.user
            });
            return profile.save().then(result => {
                console.log('Profile Successfully made!!')
                console.log(image.path)
                return res.redirect(`/profile/${req.user._id}`);
            })
            .catch(err => {
                console.log(err);
            })
        }
        return res.render("auth/credentials", {
            error: true,
            isloggedin: req.session.isloggedin
        });
    })
    .catch(err => console.log(err))
}

exports.postLogOut = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        return res.redirect('/')
    })
}

