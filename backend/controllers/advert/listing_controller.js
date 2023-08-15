const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const AdvertModel = require('../../models/advert_model')
const CommentModel = require('../../models/comment_model')
const path = require('path')
const logger = require("../../util/logger")

const debugName = "ListingController:";
// @desc    Create a new advert
// @route   POST  /api/advert/create
// @access  Public
const createListing = asyncHandler(async (req, res) => {
  logger.info("ListingController::createListing ")
  
  console.log(JSON.stringify(req.body));
  const {
    title, authors, publisher, publishedDate, pageCount, ISBN, category,
    description, location, phoneNumber, condition, price, images
  } = req.body

  const paths = []
  /*
  for (const key in req.files) {
    paths.push("/images/" + req.files[key].filename);
  }
  */
  images.map((image) => {
    paths.push("/images/" + image);
  })
  const user = req.user._id;
  //console.log(user);
  const advertData = {
      title: title || "",
      authors: authors || "",
      publisher: publisher || "",
      publishedDate: publishedDate || "",
      pageCount: pageCount || 0,
      ISBN: ISBN || "",
      category: category || "",

      description: description || "",
      location: location || "",
      condition: condition || "",
      phoneNumber: phoneNumber || "",
      price: price || "",

      user: user || "",
      status: 1,
      images: paths,
      comments: [],
  }
  console.log(advertData)

  const advert = AdvertModel.create(
    advertData, 
    function(error, result){
      if (error) {
        console.log(error);
        res.status(400).json({data: {}, message: "The listing was not created successfully.", error: error})
      } else {
        console.log(result);
        res.status(200).json({data: result, message: 'The listing was created successfully.', error: ""})
      }
  })
})

module.exports = {
  createListing,
}