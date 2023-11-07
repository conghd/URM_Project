const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const AdvertModel = require('../../models/advert_model')
const path = require('path')
const logger = require("../../util/logger")
const UserModel = require('../../models/user_model')

const debugName = "AdvertController:";

const getAdverts = asyncHandler(async (req, res) => {
  const { category, keyword, offset, limit } = req.query;
  logger.info("AdvertController::listAdverts - (%s, %s, %s, %s)",
    category, keyword, offset, limit)
  let condition = {status: 1};

  let adverts = await AdvertModel.find(condition)
    // .populate(['user', 'comments'])
    .populate({path: 'user', select: "_id name email"})
    .sort({createdAt: -1})
    .skip(offset)
    .limit(limit)
    .exec();
  
  
  // Check bookmark
  const adverts2 = adverts.map((advert) => {
    const isBookmark = req.user.bookmarks.includes(advert._id)
    advert.set("isBookmark", isBookmark, {strict: false});
    return advert;
  })

  res.send(adverts2)
})

const search = asyncHandler(async (req, res) => {
  const { category, keyword, offset, limit } = req.query;
  logger.info("AdvertController::search - (%s, %s, %s, %s)",
    category, keyword, offset, limit)

  const queryRegx = new RegExp(keyword, 'i');
  const adverts = await AdvertModel.find({$or: [
      {"title": {$regex: queryRegx}},
      {"description": {$regex: queryRegx}},
      {"authors": {$regex: queryRegx}}
      ],
    status: 1,
    },
    )
    //.populate(['user', 'comments'])
    .populate({path: 'user', select: "_id name email"})
    .sort({createdAt: -1})
    .skip(offset)
    .limit(limit)
    .exec();

    // Check bookmark
  const adverts2 = adverts.map((advert) => {
    const isBookmark = req.user.bookmarks.includes(advert._id)
    advert.set("isBookmark", isBookmark, {strict: false});
    return advert;
  })

  logger.info("AdvertController::search - num records: " + adverts2.length)
  res.send(adverts2)
})

const getMyAdverts = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  logger.info("AdvertController::getMyAdverts - " + userId)

  const adverts = await AdvertModel.find(
    {user: userId,
    status: { $gt: 0} })
    .populate({path: 'user', select: "_id name email"})
    .sort({status: 1, createdAt: -1})
    .exec();

  res.send(adverts)
})

const getAdvert = asyncHandler(async (req, res) => {
    const advertId = req.params.id;
    const userId = req.user._id;
    const advert = await AdvertModel.findById(advertId)
      .populate({path: "user", select: "_id name email bookmarks"})
      .exec();
      
  res.json({ data: advert, message: ''})
})

module.exports = {
  getAdvert,
  getAdverts,
  search,
  getMyAdverts,
}