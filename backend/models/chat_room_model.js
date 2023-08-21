const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const ChatRoomSchema = mongoose.Schema({
  name: { type: String, required: true },
  messages: [{
    type: ObjectId,
    ref: "Message",
  }],
}, {timestamps: true});

//UpVoteSchema.index({post: 1, user: -1}, { unique: true })
const ChatRoomModel = mongoose.model("ChatRoom", ChatRoomSchema)

module.exports = ChatRoomModel;