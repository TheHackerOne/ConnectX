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


app.get("/profile", (req, res, next) => {
    res.render("user/profile",{
        pageTitle: "username"
    });
});

app.get('/',(req, res, next) => {
    res.render('homepage/homepage',{
        pageTitle: "ConnectX"
    });
});

app.get('/signup', (req, res, next) => {
    res.render('signup',{
        pageTitle: "signup"
    })
});

app.use('/', (req, res, next) => {
    res.render('error',{
        pageTitle: "404 NOT FOUND"
    })
});


const PORT = process.env.PORT||3000;

mongoose
.connect(
    "mongodb+srv://yashchaudhary:pinacolada@cluster0-kym1f.mongodb.net/test?retryWrites=true&w=majority"
).then(result => {
    app.listen(PORT, () => {
        console.log(`Successfully Connected To Port ${PORT}`);
    });
})
.catch(err => console.log(err));