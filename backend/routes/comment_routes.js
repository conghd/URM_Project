const express = require('express')
const router = express.Router()

const {
  createComment,
  //updatePost,
  //deletePost,
  getComments,
  //getPost,
  //voteUpPost,
  //voteDownPost,
  //commentPost,
} = require('../controllers/comment/comment_controller')

const { protect } = require('../middleware/auth_middleware')

router.route('/create').post(protect, createComment)
router.route('/get').post(protect, getComments)
//router.route('/update/:id').post(protect, updatePost)
//router.route('/delete/:id').post(protect, deletePost)
//router.route('/get/:id').get(protect, getPost)
//
//router.route('/:id/vote_up').post(protect, voteUpPost)
//router.route('/:id/vote_down').post(protect, voteDownPost)
//router.route('/:id/comment').post(protect, commentPost)

module.exports = router