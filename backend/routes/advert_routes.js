const express = require('express')
const router = express.Router()

const {
  createAdvert,
  //updatePost,
  //deletePost,
  getAdverts,
  search,
  getMyAdverts,
  //voteUpPost,
  //voteDownPost,
  //commentPost,
} = require('../controllers/advert/advert_controller')

const { protect } = require('../middleware/auth_middleware')

router.route('/create').post(protect, createAdvert)
//router.route('/create').post(createAdvert)
//router.route('/list').get(protect, getAdverts)
//router.route('/list').get(getAdverts)
router.route('/list').get(getAdverts)
router.route('/search').get(search)
router.route('/get_my_adverts').get(getMyAdverts)
//router.route('/update/:id').post(protect, updatePost)
//router.route('/delete/:id').post(protect, deletePost)
//router.route('/get/:id').get(protect, getPost)
//
//router.route('/:id/vote_up').post(protect, voteUpPost)
//router.route('/:id/vote_down').post(protect, voteDownPost)
//router.route('/:id/comment').post(protect, commentPost)

module.exports = router