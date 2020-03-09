exports.authenticated = (req, res, next) => {
    if(!req.session.isloggedin){
        return res.redirect('/login')
    }   
    else if(req.session.filledCredentials){
        return res.redirect('/')
    } 
    next();
}