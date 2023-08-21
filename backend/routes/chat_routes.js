const express = require('express')
const router = express.Router()

const {
  getChatRooms,
} = require('../controllers/chat/chat_controller')

const { protect } = require('../middleware/auth_middleware')

router.route('/get_chat_rooms').get(protect, getChatRooms)

module.exports = router