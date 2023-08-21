const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const AdvertModel = require('../../models/advert_model')
const path = require('path')
const logger = require("../../util/logger")
const UserModel = require('../../models/user_model')

const debugName = "AdvertController:";
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/upload/images');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({storage: storage}).array("images", 16);
// @desc    Create a new advert
// @route   POST  /api/advert/create
// @access  Public
const createAdvert = asyncHandler(async (req, res) => {
  logger.info("AdvertController::createAdvert ")
  await upload(req, res, (err) => {
    if (err) {
      res.status(400)
      throw new Error('Upload problem')
    } else {
      console.log(req.body);
      const {
        title, authors, publisher, publishedDate, pageCount, ISBN, category,
        description, location, phoneNumber, condition, price
      } = req.body

      const paths = []
      for (const key in req.files) {
        paths.push("/images/" + req.files[key].filename);
      }
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
          phoneNumber: phoneNumber || "(306) 888-9999",
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
    }
  })
})

// @desc    Update a post
// @route   POST /api/post/:id/update
// @access  Public
const updatePost = asyncHandler(async (req, res) => {
  res.json({ 'message': 'updatePost'})
})

// @desc    Delete a post
// @route   POST /api/post/:id/delete
// @access  Public
const deletePost = asyncHandler(async (req, res) => {
  console.info(debugName + "deletePost")
  res.json({ 'message': 'deletePost'})
})
// @desc    get Posts
// @route   POST  /api/post/list
// @access  Private
/*
const getAdverts = asyncHandler(async (req, res) => {
  console.log("listAdverts")
  const {category} = req.body;
  var condition = {};
  if (category) {
    condition = {category: category}
  } else {
  }
  console.log("Condition: " + JSON.stringify(condition));
  const adverts = await AdvertModel.find(condition)
    .populate(['user', 'comments'])
    .sort({createdAt: -1})
    .exec();

  res.send(adverts)
})
*/
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

  logger.info("AdvertController::search - num records: " + adverts.length)
  res.send(adverts)
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
  createAdvert,
  getAdvert,
  getAdverts,
  search,
  getMyAdverts,
}