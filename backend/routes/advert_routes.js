const express = require('express')
const router = express.Router()

const {
  getAdvert,
  getAdverts,
  search,
  getMyAdverts,
} = require('../controllers/advert/advert_controller')

const { protect } = require('../middleware/auth_middleware')

router.route('/list').get(protect, getAdverts)
router.route('/get/:id').get(protect, getAdvert)
router.route('/search').get(protect, search)
router.route('/get_my_adverts').get(protect, getMyAdverts)

module.exports = router