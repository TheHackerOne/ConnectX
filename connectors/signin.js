const user = require('../model/user');

exports.postSignIn = (req, res, next) => {
    const user_email = req.body.email;
    const user_password = req.body.password;
    
    user
    .findOne({user_email: user_email, user_password: user_password })
    .then(user => {
        if(user){
            // console.log(user._id.toString());
            req.session.isloggedin = true;
            const url = `/credentials/${user._id}`;
            console.log(url);
            res.redirect(url);
        }else{
            res.render('signup',{
                pageTitle: "Signin",
                text : "NO USER FOUND!! TRY SIGNUP ->",
                error: false
            })
    }
    })
    .catch(err => {
        console.log(err);
    })
};
