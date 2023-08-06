const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  logoutUser,
  listUser,
  forgotPassword,
  verifyAccount,
  activateAccount,
  resendCode,
  resetPassword,
  changePassword,
} = require('../controllers/user/user_controller')

const { protect } = require('../middleware/auth_middleware')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/list').get(listUser)
router.route('/logout').get(logoutUser)
router.route('/activate').post(activateAccount)
router.route('/forgot_password').post(forgotPassword)
router.route('/verify_account').post(verifyAccount)
router.route('/resend_code').post(resendCode)
router.route('/reset_password').post(resetPassword)
router.route('/change_password').post(changePassword)

module.exports = router