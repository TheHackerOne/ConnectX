const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session');
const csrf = require('csurf');
const multer = require('multer');
const mongoDBStore = require('connect-mongodb-session')(session);
const User = require('./model/user');

const URI = "mongodb+srv://yashchaudhary:pinacolada@cluster0-kym1f.mongodb.net/ConnectX?retryWrites=true&w=majority";

const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'image')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, "-")+ file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const store = new mongoDBStore({
    uri: URI,
    collection: "sessions"
});
const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views','views');

app.use(express.static(path.join(__dirname,'public')));
app.use('/image',express.static(path.join(__dirname,'image')));
app.use(bodyParser.urlencoded({ extended : true}));
app.use(multer({storage: storage, fileFilter: fileFilter}).single('profilePic'))

const errorController = require("./connectors/error");
const homePageRouter = require('./router/homepage');
const authRouter = require('./router/authentication');
const profileRouter = require('./router/user-profile');

app.use(
    session({
        secret: "kserkgvjbeskjvb.esbvlbksejvsejbfv,sjbvkjsdkj.bvkaebsvksev",
        saveUninitialized: false,
        resave: false,
        store: store
    })
)

app.use(csrfProtection);

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

app.use((req, res, next) => {
    res.locals.isloggedin = req.session.isloggedin;
    res.locals.csrfToken = req.csrfToken();
    next();
})

app.get('/', homePageRouter);

app.use(profileRouter);

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