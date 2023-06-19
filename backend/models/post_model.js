const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  comments: [{
      type: ObjectId, ref: "Comment"
  }],
  upVotes: [{
    type: ObjectId, ref: "UpVote"
  }],
  downVotes: [{
    type: ObjectId, ref: "DownVote"
  }]
}, {timestamps: true});

const PostModel = mongoose.model("Post", postSchema)

module.exports = PostModel;