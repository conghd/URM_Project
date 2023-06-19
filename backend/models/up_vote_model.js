const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const UpVoteSchema = mongoose.Schema({
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

UpVoteSchema.index({post: 1, user: -1}, { unique: true })
const UpVoteModel = mongoose.model("UpVote", UpVoteSchema)

module.exports = UpVoteModel;