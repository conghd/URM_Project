const express = require('express')
const router = express.Router()

const {
  createListing,
} = require('../controllers/advert/listing_controller')

const uploadMiddleware = require("../middleware/upload_file_middleware");

const { protect } = require('../middleware/auth_middleware')

router.route('/create').post(protect, 
  uploadMiddleware.uploadImages,
  uploadMiddleware.resizeImages,
  //uploadMiddleware.getResult
  createListing
)

module.exports = router