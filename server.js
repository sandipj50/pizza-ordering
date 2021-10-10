const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 8000;


app.use(express.static('public'));
app.get('/',(req,res)=>{
    res.render('home');
})


//Set template engine
app.use(expressLayout);
app.set('views',path.join(__dirname,'resources/views'));
app.set('view engine','ejs');
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);

});

