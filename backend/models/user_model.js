const mongoose = require("mongoose")
const { ObjectId } = require("mongodb");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please input your first name'],
  },
  email: {
    type: String,
    required: [true, 'Please input your email'],
    index: true,
  },
  password: {
    type: String,
    required: [true, 'Please input your password'],
  },
  activated: {
    type: Boolean,
    required: true,
  },
  activation_code: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: true,
  },
  verification_code: {
    type: String,
    required: true
  },

  bookmarks: [{ type: ObjectId, ref: "Advert", required: true}],

}, {timestamps: true});


const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel;