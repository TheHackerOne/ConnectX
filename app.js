const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));
// app.use(express.static(path.join(__dirname, "public", "images")));
// app.use(express.static(path.join(__dirname,'public','images')));
app.use(bodyParser.urlencoded({ extended : true}));

const errorController = require("./connectors/error");
const homePageRouter = require('./router/homepage');
const signUpRouter = require('./router/signup');
const signInRouter = require('./router/signin');

app.get("/profile", (req, res, next) => {
    res.render("user-profile/profile",{
        pageTitle: "username"
    });
});

app.get('/', homePageRouter);

app.use(signUpRouter);

app.use(signInRouter);

app.use('/',errorController.error);



const PORT = process.env.PORT||3000;

mongoose
.connect(
    "mongodb+srv://yashchaudhary:pinacolada@cluster0-kym1f.mongodb.net/ConnectX?retryWrites=true&w=majority"
).then(result => {
    app.listen(PORT, () => {
        console.log(`Successfully Connected To Port ${PORT}`);
    });
})
.catch(err => console.log(err));