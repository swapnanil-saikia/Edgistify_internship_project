const express=require("express");
const router= express.Router();
var Post = require('../models/post');
var Comment = require('../models/comments');
var User = require('../models/user');
const middleware=require("../middleware");
var moment = require("moment");

router.get("/post/:id/comment/new",middleware.isLoggedIn,function(req,res)
{
    Post.findById(req.params.id,function(err,post)
    {
        if(err){
            console.log(err);
        }else {
            res.render("newcomments",{post:post});
        };
        }
    );});


    router.post("/post/:id/comments",middleware.isLoggedIn,function(req,res){
        Post.findById(req.params.id,function(err,post){
            if(err)
            {
                console.log(err);
                res.redirect("/");
            }
            else{
                Comment.create(req.body.comment,function(err,comment){
                    if(err)
                    {
                        console.log(err);
                    }
                    else{
                       
                        var date_ob = new Date();
                        var date = ("0" + date_ob.getDate()).slice(-2);
                        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                        var year = date_ob.getFullYear();
                        var endDate = year + "-" + month + "-" + date;
                        var commentdate =moment(Date.now()).fromNow();
                        comment.f=commentdate;

                        
                   
                        comment.author.id = req.user._id;
                        comment.author.username = req.user.email;
                        comment.save();
                        post.comments.push(comment);
                        post.save();
                        setTimeout(function(){res.redirect('/post/' + post._id)},1500);
                        
                    }
                })
            }
        })
    });


router.delete("/post/:id/comments/:comment_id",middleware.checkcommentownership,function(req,res)
{
    console.log("deleted");
    Comment.findByIdAndRemove(req.params.comment_id,function(err)
    {
        if(err)
        {
            res.redirect("back");
        }
        else
        {
                res.redirect("/post/" + req.params.id);
        }
    });
});
    


module.exports = router;