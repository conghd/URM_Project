const asyncHandler = require('express-async-handler')
const AdvertModel = require('../../models/advert_model')
const UserModel = require("../../models/user_model")
const path = require('path')
const logger = require("../../util/logger")

const debugName = "BookmarkController";

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

module.exports = {
  updateBookmark,
  getBookmarks,
}