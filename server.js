require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
const passport = require('passport');

//Database connection
const url = 'mongodb://localhost:27017/pizza';
mongoose.connect(url, { useNewUrlParser:true,useUnifiedTopology:true});
const connection = mongoose.connection;

connection.on('error',console.error.bind(console, "connection error: "));
connection.once('open',()=>{
    console.log('Database connected...');
});

//Session store
let mongoStore = MongoDbStore.create({
    mongoUrl : url,
});

//Session config
app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave : false,
    saveUninitialized :false,
    store:mongoStore,
    cookie:{
        maxAge: 1000*60*60*24 //24 hours
    }
}))

app.use(flash());

//passport config

const passportInit = require('./app/config/passport');
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());


//Assests
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Global middleware

app.use((req,res,next)=>{
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
})
//Set template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine','ejs');

require('./routes/web')(app);



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);

});