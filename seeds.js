var multer = require('multer');
const isImageUrl = require('is-image-url');
var mongoose=require("mongoose");

var path = require('path');
var moment = require("moment");

var Comment = require('./models/comments');
var Post = require('./models/post');
var User = require('./models/user');

var postrouter = require('./router/post');
var commentrouter = require('./router/comment');

var indexRoute = require('./router/index');
var objectId = mongoose.Types.ObjectId('569ed8269353e9f4c51617aa');



var data = [
    {
        name : "supply_chain",
     img : "https://t3.ftcdn.net/jpg/02/35/44/24/240_F_235442466_pw3KRZeY92Xwduk5VIfcpvHXUVm0XjCC.jpg",
        description : "A supply chain is the network of all the individuals, organizations, resources, activities and technology involved in the creation and sale of a product, from the delivery of source materials from the supplier to the manufacturer, through to its eventual delivery to the end user.",
        likes : [],
        dislikes : [],
        flag: 1,
        author : {
            id: objectId,
            username : "user1"
        },

    },
    {
        name : "supply_chain",
        img : "https://image.shutterstock.com/image-vector/industry-40-smart-factory-digitalization-260nw-1030443202.jpg",
           description : "The supply chain operations reference model (SCOR) is a management tool used to address, improve, and communicate supply chain management decisions within a company and with suppliers and customers of a company (1). The model describes the business processes required to satisfy a customer's demands.",
           likes : [],
           dislikes : [],
           flag: 1,
           author : {
            id: objectId,
            username : "user2"
           },
           
    },
    {
        name : "supply_chain",
        img : "https://blog.ipleaders.in/wp-content/uploads/2018/07/multi-party-network-in-global-supply-chain-1.1.jpg",
           description : "The supply chain operations reference model (SCOR) is a management tool used to address, improve, and communicate supply chain management decisions within a company and with suppliers and customers of a company (1). The model describes the business processes required to satisfy a customer's demands.",
           likes : [],
           dislikes : [],
           flag: 1,
           author : {
            id: objectId,
            username : "user3"
           },
           
    },
    {
        name : "supply_chain",
        img : "https://i1.wp.com/www.globaltrademag.com/wp-content/uploads/2019/08/shutterstock_1092234560.jpg?fit=757%2C393&ssl=1",
        description : "The supply chain operations reference model (SCOR) is a management tool used to address, improve, and communicate supply chain management decisions within a company and with suppliers and customers of a company (1). The model describes the business processes required to satisfy a customer's demands.",
        likes : [],
           dislikes : [],
           flag: 1,
           author : {
            id: objectId,
            username : "user4"
           },
           
    },
    {
        name : "supply_chain",
        img : "https://ichef.bbci.co.uk/news/400/cpsprodpb/14202/production/_108243428_gettyimages-871148930.jpg",
        description : "The supply chain operations reference model (SCOR) is a management tool used to address, improve, and communicate supply chain management decisions within a company and with suppliers and customers of a company (1). The model describes the business processes required to satisfy a customer's demands.",
        likes : [],
           dislikes : [],
           flag: 1,
           author : {
            id: objectId,
            username : "user6"
           },
           
    },
    {
        name : "supply_chain",
        img : "https://www.supplychaindigital.com/sites/default/files/styles/slider_detail/public/topic/image/GettyImages-1132986308%20%281%29.jpg?itok=opTnCjF2",
        description : "The supply chain operations reference model (SCOR) is a management tool used to address, improve, and communicate supply chain management decisions within a company and with suppliers and customers of a company (1). The model describes the business processes required to satisfy a customer's demands.",
        likes : [],
           dislikes : [],
           flag: 1,
           author : {
            id: objectId,
            username : "user7"
           },
           
    },
    {
        name : "supply_chain",
        img : "https://cdn2.hubspot.net/hubfs/1546224/blog_en/supply-chain-logistics.jpg",
        description : "The supply chain operations reference model (SCOR) is a management tool used to address, improve, and communicate supply chain management decisions within a company and with suppliers and customers of a company (1). The model describes the business processes required to satisfy a customer's demands.",

        likes : [],
           dislikes : [],
           flag: 1,
           author : {
            id: objectId,
            username : "user6"
           },
           
    }
]
var date_ob = new Date();
                        var date = ("0" + date_ob.getDate()).slice(-2);
                        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                        var year = date_ob.getFullYear();
                        var endDate = year + "-" + month + "-" + date;
                        var commentdate =moment(Date.now()).fromNow();
                        

function seedDB(){
    //Remove all campgrounds
    Post.remove({name:"supply_chain"}, function(err){
        if(err){
            console.log(err);
        }
         
          //add a few campgrounds
         data.forEach(function(seed){
             Post.create(seed, function(err, post){
                 if(err){
                     console.log(err);
                 } else {
                     
                     //create a comment
                     Comment.create(
                         {
                             body: "valuable",
                             author : {
                                id: objectId,
                                username : "user6"
                               },
                             f: commentdate
                             
                         }, function(err, comment){
                             if(err){
                                 console.log(err);
                             } else {
                                 post.comments.push(comment);
                                 post.save();
                                 
                                 
                             }
                         });

                 }
             });
         });
     }); 
     //add a few comments
    }
 
 module.exports = seedDB;