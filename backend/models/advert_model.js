const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const AdvertSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true
  },
  images: [{
    type: String,
  }],
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
  },
  comments: [{
      type: ObjectId, ref: "Comment"
  }],
}, {timestamps: true});

const AdvertModel = mongoose.model("Advert", AdvertSchema)

module.exports = AdvertModel;