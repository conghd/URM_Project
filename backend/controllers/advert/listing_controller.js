const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const AdvertModel = require('../../models/advert_model')
const UserModel = require("../../models/user_model")
const path = require('path')
const logger = require("../../util/logger")

const debugName = "ListingController";
// @desc    Create a new advert
// @route   POST  /api/advert/create
// @access  Public
const createListing = asyncHandler(async (req, res) => {
  logger.info(`${debugName}::createListing`)
  
  const {
    title, authors, publisher, publishedDate, pageCount, ISBN, category,
    description, location, phoneNumber, condition, price, images
  } = req.body

  const paths = images.map((image) => `/images/${image}`);
  const user = req.user._id;
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

  const advert = AdvertModel.create(
    advertData, 
    function(error, result){
      if (error) {
        res.status(400).json({data: {}, message: "The listing was not created successfully.", error: error})
      } else {
        res.status(200).json({data: result, message: 'The listing was created successfully.', error: ""})
      }
  })
})

const sellListing = asyncHandler(async (req, res) => {
  const { id } = req.query;
  logger.info(`${debugName}::sellListing- (%s)`, id)

  const filter = {"_id": id};
  const update = {"status": 2};

  const advert = await AdvertModel.findById(id).exec();
  advert.status = 2;
  await advert.save();
  logger.info("ListingController::updateStatus- " + advert.status)
  res.status(200).json({data: advert, message: ""})
  /*
  await AdvertModel.findByIdAndUpdate(id, update, (error, advert) => {
    if (error) {
      res.status(400).json({data: {}, message: error})
    } else {
      logger.info("ListingController::sellListing- " + advert.status)
      res.status(200).json({data: advert, message: ""})
    }
  })
  */
})

const updateStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.query;
  logger.info(`${debugName}::updateStatus- (%s, status: %s)`, id, status)

  const filter = {"_id": id};
  const update = {"status": status};

  const advert = await AdvertModel.findById(id).exec();
  advert.status = status;
  await advert.save();
  res.status(200).json({data: advert, message: ""})
/*
  await AdvertModel.findByIdAndUpdate(id, update, (error, advert) => {
    if (error) {
      res.status(400).json({data: {}, message: error})
    } else {
      logger.info("ListingController::updateStatus- " + advert.status)
      res.status(200).json({data: advert, message: ""})
    }
  })
  */
})

const updateBookmark = asyncHandler(async (req, res) => {
  const { id, add } = req.body;
  const userId = req.user._id;
  logger.info(`${debugName}::updateBookmark - (userId: %s, listingId: %s, %s)`,
    userId, id, add)
  
  const condition = (add == true || add =="true") ?
   {$addToSet: {bookmarks: id}} : {$pull: {bookmarks: id}};
   //{$push: {bookmarks: id}} : {$pull: {bookmarks: id}};
  const user = await UserModel.findByIdAndUpdate(userId,
    condition,
    {new: true, })
  const listing = await AdvertModel.findById(id)
  .exec();
  res.status(200).json({
      data: listing,
      meta: {id, add},
      message: ""
  })
})

/**
 * getBookmarks
 * method: GET
 */
const getBookmarks = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  logger.info(`${debugName}::getBookmarks - (%s)`, userId)

  const user = await UserModel.findById(userId, "bookmarks")
    .populate("bookmarks")
    .exec();
  
  res.status(200).json({data: user.bookmarks, message: ""})
})

const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.query;
  logger.info(`${debugName}::deleteListing- (%s)`, id)

  const filter = {"_id": id};
  const update = {"status": 0};

  let advert = await AdvertModel.findByIdAndUpdate(id, update)
    .exec();

  res.send({data: advert, message: "", error: "",})
})

module.exports = {
  createListing,
  sellListing,
  deleteListing,
  updateStatus,
  updateBookmark,
  getBookmarks,
}