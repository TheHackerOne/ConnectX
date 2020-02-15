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
        single_user_id = single_user[0]._id;
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
    })
};
