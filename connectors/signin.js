const user = require('../model/user');

exports.postSignIn = (req, res, next) => {
    const user_email = req.body.email;
    const user_password = req.body.password;
    
    user
    .find()
    .then(user => {
        console.log(user);
        let single_user = [];
        single_user = user.filter(a => a.user_email == user_email && a.user_password == user_password );
        console.log(single_user);
        if(single_user.length==1){
            res.redirect('/credentials');
        }else{
            res.render('signup',{
                pageTitle: "Signin",
                text : "NO USER FOUND!! TRY SIGNUP ->"
            })
    }
    })
    .catch(err => {
        console.log(err);
    })
};
