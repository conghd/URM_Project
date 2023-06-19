const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const DownVoteSchema = mongoose.Schema({
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "Post",
    required: true,
  },
}, {timestamps: true});

DownVoteSchema.index({post: 1, user: -1}, { unique: true })
const DownVoteModel = mongoose.model("DownVote", DownVoteSchema)

module.exports = DownVoteModel;