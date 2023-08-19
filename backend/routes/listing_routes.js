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

const uploadMiddleware = require("../middleware/upload_file_middleware");

const { protect } = require('../middleware/auth_middleware');

router.route('/create').post(protect, 
  uploadMiddleware.uploadImages,
  uploadMiddleware.resizeImages,
  //uploadMiddleware.getResult
  createListing
)
router.route('/sell').get(sellListing)
router.route('/delete').get(deleteListing)
router.route('/update_status').get(updateStatus)
router.route('/update_bookmark').post(protect, updateBookmark)
router.route('/get_bookmarks').get(protect, getBookmarks)
module.exports = router