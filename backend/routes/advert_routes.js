const express = require('express')
const router = express.Router()

const {
  createAdvert,
  //updatePost,
  getAdvert,
  getAdverts,
  search,
  getMyAdverts,
  //voteUpPost,
  //voteDownPost,
  //commentPost,
} = require('../controllers/advert/advert_controller')

const { protect } = require('../middleware/auth_middleware')

router.route('/create').post(protect, createAdvert)
router.route('/list').get(protect, getAdverts)
router.route('/get/:id').get(protect, getAdvert)
router.route('/search').get(protect, search)
router.route('/get_my_adverts').get(protect, getMyAdverts)
//router.route('/update/:id').post(protect, updatePost)
//router.route('/delete/:id').post(protect, deletePost)
//
//router.route('/:id/vote_up').post(protect, voteUpPost)
//router.route('/:id/vote_down').post(protect, voteDownPost)
//router.route('/:id/comment').post(protect, commentPost)

module.exports = router