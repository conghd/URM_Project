const express = require('express')
const router = express.Router()

const {
  createListing,
  sellListing,
  deleteListing,
  updateStatus,
} = require('../controllers/advert/listing_controller')

const uploadMiddleware = require("../middleware/upload_file_middleware");

const { protect } = require('../middleware/auth_middleware')

router.route('/create').post(protect, 
  uploadMiddleware.uploadImages,
  uploadMiddleware.resizeImages,
  //uploadMiddleware.getResult
  createListing
)
router.route('/sell').get(sellListing)
router.route('/delete').get(deleteListing)
router.route('/update_status').get(updateStatus)
module.exports = router