var middleware={};
var Post = require('../models/post');
var User = require('../models/user');

var Comment=require("../models/comments");

middleware.checkownership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Post.findById(req.params.id, function(err,foundPost)
    {
        if(err)
        {
              res.redirtect("back");
        } else{
            if(foundPost.author.id.equals(req.user._id)){
                console.log("success");
                next();
            }
            else{
                res.redirect("back");
            }
        }
    });
    }
    else{
        res.redirect("back");
    }
}


middleware.checkcommentownership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id, function(err,foundcomment)
    {
        if(err)
        {
              res.redirtect("back");
        } else{
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            }
            else{
                res.redirect("back");
            }
        }
    });
    }
    else{
        res.redirect("back");
    }
}


middleware.isLoggedIn=function(req,res,next)
 {
     if(req.isAuthenticated())
     {
         return next();
     }
     req.flash("error","Please Login First!");
     res.redirect("/login");
 };
 module.exports=middleware;