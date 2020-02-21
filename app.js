const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);
const User = require('./model/user');

const URI = "mongodb+srv://yashchaudhary:pinacolada@cluster0-kym1f.mongodb.net/ConnectX?retryWrites=true&w=majority";

const app = express();

const store = new mongoDBStore({
    uri: URI,
    collection: "sessions"
});

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static(path.join(__dirname, "public", "images")));
// app.use(express.static(path.join(__dirname,'public','images')));
app.use(bodyParser.urlencoded({ extended : true}));

const errorController = require("./connectors/error");
const homePageRouter = require('./router/homepage');
const authRouter = require('./router/authentication');


app.use(
    session({
        secret: "kserkgvjbeskjvb.esbvlbksejvsejbfv,sjbvkjsdkj.bvkaebsvksev",
        saveUninitialized: false,
        resave: false,
        store: store
    })
)

app.use((req, res, next) => {
    if(!req.session.user){
        return next()
    }
    User.findById(req.session.user._id)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => console.log(err))
})

app.get("/profile", (req, res, next) => {
    res.render("user-profile/profile",{
        pageTitle: "username"
    });
});

app.get('/', homePageRouter);

app.use(authRouter);

app.use('/',errorController.error);



const PORT = process.env.PORT||3000;

mongoose
.connect(
    URI
).then(result => {
    app.listen(PORT, () => {
        console.log(`Successfully Connected To Port ${PORT}`);
    });
})
.catch(err => console.log(err));