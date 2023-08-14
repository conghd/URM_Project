const { ObjectId } = require("mongodb");
const mongoose = require("mongoose")

const AdvertSchema = mongoose.Schema({
  title: { type: String, required: true, },
  authors: { type: String, required: false, },
  publisher: { type: String, required: false, },
  publishedDate: { type: String, required: false, },
  pageCount: { type: String, required: false, },
  ISBN: { type: String, required: false, },
  category: { type: String, required: true, },

  description: { type: String, required: true, },
  location: { type: String, required: true, },
  condition: { type: String, required: true, },
  phoneNumber: { type: String, required: true },
  price: { type: String, required: true, },

  user: { type: ObjectId, ref: "User", required: true, },
  status: { type: Number, required: true, },
  images: [{type: String, }],

  // Will be removed soon
  comments: [{
      type: ObjectId, ref: "Comment"
  }],
}, {timestamps: true});

const AdvertModel = mongoose.model("Advert", AdvertSchema)

module.exports = AdvertModel;