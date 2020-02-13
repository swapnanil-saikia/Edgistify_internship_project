var mongoose = require('mongoose');

var schema = mongoose.Schema;
var commentSchema = new schema({
  body: String,
  f: String,
  author: {
    id: {
        type: schema.Types.ObjectId,
        ref: "User"
    },
    username: String
},
date: {
  type: Date,
  default: Date.now
}
});

module.exports = mongoose.model("Comment",commentSchema);