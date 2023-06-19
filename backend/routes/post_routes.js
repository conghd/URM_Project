const express = require('express')
const multer = require('multer')
const router = express.Router()

const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPost,
  voteUpPost,
  voteDownPost,
  commentPost,
} = require('../controllers/post/post_controller')

const { protect } = require('../middleware/auth_middleware')
//const { uploadFile } = require('../middleware/upload_file_middleware' )

router.route('/create').post(protect, createPost)

router.route('/update/:id').post(protect, updatePost)
router.route('/delete/:id').post(protect, deletePost)
router.route('/get').get(protect, getPosts)
router.route('/get/:id').get(protect, getPost)

router.route('/:id/vote_up').post(protect, voteUpPost)
router.route('/:id/vote_down').post(protect, voteDownPost)
router.route('/:id/comment').post(protect, commentPost)

module.exports = router