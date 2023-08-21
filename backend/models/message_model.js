const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const MessageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: { type: ObjectId,
    ref: "User",
    required: true,
  },
  time: { type: Date, required: true },
}, {timestamps: true});

const MessageModel = mongoose.model("Message", MessageSchema)

module.exports = MessageModel;