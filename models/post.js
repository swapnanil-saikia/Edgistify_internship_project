var mongoose = require('mongoose');

var schema = mongoose.Schema;
var postSchema = new schema({
  name : String,
  img : String,
  description : String,
  flag : Number,
  author: {
    id: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    username: String
},
  comments: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Comment"
    }
  ],
  likes: [
   
      {  type: schema.Types.ObjectId,
        ref: 'User'
      }
     


  ],
  dislikes: [
   
    {  type: schema.Types.ObjectId,
      ref: 'User'
    }
   


],
date: {
  type: Date,
  default: Date.now
}
})


module.exports = mongoose.model("Post",postSchema);