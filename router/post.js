const express=require("express");
const router= express.Router();
var Comment = require('../models/comments');
var Post = require('../models/post');
var User = require('../models/user');
var moment = require("moment");
const middleware=require("../middleware");
const ejsLint = require('ejs-lint');
const isImageUrl = require('is-image-url');

// const middleware=require("../middleware");

router.post('/post',middleware.isLoggedIn,function(req,res){
    var name = req.body.name;
    var img = req.body.image;
    var description = req.body.description;
    var author={
      id: req.user._id,
      username: req.user.email
  }
  var ts = Date.now();
  if(isImageUrl(img)){
    var flag=1;
    console.log("yes");
}
else{
    console.log("no");
    flag=0;
}
  var date_ob = new Date(ts);
  var date = date_ob.getDate();
  var month = date_ob.getMonth() + 1;
  var year = date_ob.getFullYear();

  // prints date & time in YYYY-MM-DD format
  var dat = year + "-" + month + "-" + date;
//   var da = moment(dat).format('LL')

    var newPost = { name:name, img:img ,description:description,author:author,flag:flag};
    Post.create(newPost,(err,newlyCreated)=>{
        if(err){
            // console.log(err);
            console.log(req.body.name);

        }
        else{
          res.redirect("/");
            console.log("Created");
            console.log(newlyCreated);
        }
    });
});


router.get('/newpost',middleware.isLoggedIn,(req,res)=>{
    res.render("newpost.ejs");
});


router.get("/post/:id",function(req,res){
    Post.findOne({_id:req.params.id}).populate("comments").exec(function(err,foundCampground){
      if(err){
        console.log(err);
      } else{
        

        var date_ob = new Date();
        var date = ("0" + date_ob.getDate()).slice(-2);
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        var year = date_ob.getFullYear();
        var endDate = year + "-" + month + "-" + date;
        var startDate = foundCampground.comments.data;
        var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
         var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
         var duration = moment.duration(end_date.diff(start_date));
        var days = duration.asDays();  
        var hours = moment.duration().asHours();   

        var postdate1 =moment(foundCampground.date).format('LL');
        var postdate =moment(foundCampground.date).fromNow();

        var commentdate =moment(foundCampground.comments.date).fromNow();
        foundCampground.comments.forEach(function(comment){
            
            var commentdate =moment(comment.date).fromNow();
            comment.f=commentdate;
            comment.save();
        });
        console.log(typeof postdate);
        console.log(postdate1);
        res.render("postdetails",{campground:foundCampground,commentdate:commentdate,postdate:postdate1});
    };
  
  
  });
});


  router.get("/post/:id/edit",middleware.checkownership,function(req,res)
{
    
        Post.findById(req.params.id, function(err,foundPost)

        {
                res.render("postedit", {post: foundPost});
    
        })
});

router.put("/post/:id",middleware.checkownership, function(req,res)
{
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, updatedPost)
    {
        if(err)
        {
            res.redirect("/post");
        }
        else{
            res.redirect("/post/" + req.params.id);
        }
    });
});

router.delete("/post/:id",middleware.checkownership,function(req,res)
{  
    Post.findByIdAndRemove(req.params.id,function(err)
    {
        if(err)
        {
            res.redirect("/");
        }else{
            res.redirect("/");
        }
    });
});

router.post("/post/:id/like",middleware.isLoggedIn,function(req,res){
    Post.findById(req.params.id,function(err,foundPost){
        if(foundPost){
            Post.find({likes: req.user._id}).count(function(err,cou){
                Post.find({dislikes: req.user._id}).count(function(err,cou1){
                if(cou===0 && cou1===0){
                    User.findById(req.user._id,function(err,user){
                    foundPost.likes.push(user);
                    foundPost.save();
                    console.log(user);
                    setTimeout(function(){res.redirect("/post/" + req.params.id)},2000);
           
                });
            }  
            else if(cou===0 && cou1!=0){
                User.findById(req.user._id,function(err,user){
                    foundPost.likes.push(user);
                    var index = foundPost.dislikes.indexOf(user);
                    foundPost.dislikes.splice(index, 1);
                    foundPost.save();
                    setTimeout(function(){res.redirect("/post/" + req.params.id)},2000);
                })
            }
            else if(cou!=0 && cou1===0){
                User.findById(req.user._id,function(err,user){
                   
                    var index = foundPost.likes.indexOf(user);
                    foundPost.likes.splice(index, 1);
                    foundPost.save();
                    setTimeout(function(){res.redirect("/post/" + req.params.id)},2000);
                })
            }
            else {
                res.redirect("/post/" + req.params.id);
                console.log(cou);    }
            })} );
            } 
            else{     
            }})});





router.post("/post/:id/dislike",middleware.isLoggedIn,function(req,res){
                Post.findById(req.params.id,function(err,foundPost){
                    if(foundPost){
                        Post.find({likes: req.user._id}).count(function(err,cou){
                            Post.find({dislikes: req.user._id}).count(function(err,cou1){
                            if(cou===0 && cou1===0){
                                User.findById(req.user._id,function(err,user){
                                foundPost.dislikes.push(user);
                                foundPost.save();
                                console.log(user);
                                setTimeout(function(){res.redirect("/post/" + req.params.id)},2000);
                       
                            });
                        }  
                        else if(cou===0 && cou1!=0){
                            User.findById(req.user._id,function(err,user){
                               
                                var index = foundPost.dislikes.indexOf(user);
                                foundPost.dislikes.splice(index, 1);
                                foundPost.save();
                                setTimeout(function(){res.redirect("/post/" + req.params.id)},2000);
                            })
                        }
                        else if(cou!=0 && cou1===0){
                            User.findById(req.user._id,function(err,user){
                                foundPost.dislikes.push(user);
                                var index = foundPost.likes.indexOf(user);
                                foundPost.likes.splice(index, 1);
                                foundPost.save();
                                setTimeout(function(){res.redirect("/post/" + req.params.id)},2000);
                            })
                        }
                        else {
                            res.redirect("/post/" + req.params.id);
                            console.log(cou);    }
                        })} );
                        } 
                        else{     
                        }})});
            







// router.post("/post/:id/dislike",middleware.isLoggedIn,function(req,res){
    //         Post.findById(req.params.id,function(err,foundPost){
    //             if(foundPost){
    //                 Post.find({dislikes: req.user._id}).count(function(err,cou){
    //                     Post.find({likes: req.user._id}).count(function(err,cou1){
    //                     if(cou===0){
    //                         User.findById(req.user._id,function(err,user){
    //                         foundPost.dislikes.push(user);
    //                         foundPost.save();
    //                         console.log(user);
    //                         setTimeout(function(){res.redirect("/post/" + req.params.id)},2000);
                   
    //                     });
    //                 }
    
    //                 else{
    //                     res.redirect("/post/" + req.params.id);
    //                     console.log(cou); 
    //                 }   
    //             })} );} 
    //                  else{
                           
    //                     }
    //                     // console.log(foundPost.dislikes.length);    
    //             }})
               
               
    //         });

module.exports = router;