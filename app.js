var express=require("express");
var app=express();
var bodyparser=require("body-parser");
var mongoose=require("mongoose");
var flash=require("connect-flash");
var passport=require("passport");
var LocalStrategy=require("passport-local");
var methodoverride = require("method-override");
var multer = require('multer');
const isImageUrl = require('is-image-url');

const ejsLint = require('ejs-lint');
var path = require('path');
var moment = require("moment");

var Comment = require('./models/comments');
var Post = require('./models/post');
var User = require('./models/user');

var postrouter = require('./router/post');
var commentrouter = require('./router/comment');

var indexRoute = require('./router/index');

app.use(bodyparser.urlencoded(
    {extended:true}
));



app.set("view engine","ejs");

// app.use(ejsLint);

app.use(express.static(__dirname + "/public"));
app.use(methodoverride("_method"));
// seedDB();
app.use(flash());
app.use(require("express-session")(
    {
    secret: "bag",
    resave: false,
    saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password'
//     }, function(username, password, done) {
//     User.isValidUserPassword(username, password, done);
//     }));



passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req,res,next){
    res.locals.currentuser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});
mongoose.connect("mongodb://localhost/Submit",{ useNewUrlParser:true,useCreateIndex:true ,useUnifiedTopology: true });



app.get('/',(req,res)=>{
    Post.find({},(err,allPost)=>{
        
        if(err){
            console.log(err);
        }
        else{
            if(isImageUrl()){
              
            }
            else{
               
            }
            res.render("posts.ejs",{posts:allPost});
        }
    })
});


app.use(postrouter);
app.use(commentrouter);
app.use(indexRoute);


app.listen(10000,function()
{
    console.log("Server Is Running");
});