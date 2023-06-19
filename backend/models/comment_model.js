const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const CommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  images: [{
    type: String,
  }],
  post: {
    type: ObjectId,
    ref: "Post",
    require: true,
  },
  user: { type: ObjectId,
    ref: "User",
    required: true,
  },
}, {timestamps: true});

const CommentModel = mongoose.model("Comment", CommentSchema)

module.exports = CommentModel;