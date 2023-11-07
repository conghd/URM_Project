const express = require('express')
const router = express.Router()

const {
  createListing,
  sellListing,
  deleteListing,
  updateStatus,
  updateBookmark,
  getBookmarks,
} = require('../controllers/advert/listing_controller')

const { protect } = require('../middleware/auth_middleware');
const { uploadImages } = require("../middleware/upload_file_middleware");
const { resizeImages } = require("../middleware/resize_image_middleware");

router.route('/create').post(
  protect, 
  uploadImages,
  resizeImages,
  createListing
)
router.route('/sell').get(sellListing)
router.route('/delete').get(deleteListing)
router.route('/update_status').get(updateStatus)
router.route('/update_bookmark').post(protect, updateBookmark)
router.route('/get_bookmarks').get(protect, getBookmarks)
module.exports = router