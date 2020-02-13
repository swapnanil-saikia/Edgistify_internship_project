const express=require("express");
const router= express.Router();

var Post = require('../models/post');
var User = require('../models/user');

var passport = require("passport");

router.get("/register",function(req,res){
    res.render("register");
  }) ;

router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username,email:req.body.email});
    User.register(newUser,req.body.password,function(err,user){
      if(err){
        console.log(user);
        res.render("register");
      }
        passport.authenticate("local")(req,res,function(){
          
          res.redirect("/");
          console.log(user);
        });
      
    });
  });

  router.get("/login",function(req,res){
    res.render('login');
  })

  router.post("/login",passport.authenticate("local",
      {
        
        successRedirect:"/",
        
        failureRedirect: "/login"
      }), function(req,res){

});

router.get("/logout",function(req,res){
    
  req.logout();
  req.flash("success","Logged you out!");
  res.redirect("/");
});


function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/login");
}




  module.exports = router;
