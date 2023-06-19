const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  logoutUser,
  listUser,
  //forgotPassword,
  activateAccount,
} = require('../controllers/user/user_controller')

const { protect } = require('../middleware/auth_middleware')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/list').get(listUser)
router.route('/logout').get(logoutUser)
router.route('/activate').post(activateAccount)

module.exports = router