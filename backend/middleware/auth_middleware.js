const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const userModel = require('../models/user_model')

const protect = asyncHandler(async (req, res, next) => {
  let token
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      console.info("Verifying authorization....")
      // Get the token from header
      token = req.headers.authorization.split(' ')[1]
      
      if (!token) {
        res.status(401).json({
          code: 1,
          message: "Unauthorized user",
        })
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Get user from the token
      const user = await userModel.findById(decoded.id)
        .select('-password')
        .select("-activated")
        .select("-activation_code");

      if (!user) {
        res.status(401).json({
          code: 1,
          message: "Unauthorized user",
        })
      }
      req.user = user;

      next()
    } catch (error) {
      console.log(error)
        res.status(401).json({
          code: 1,
          message: "Unauthorized user",
        })
    }
  }
})

module.exports = { protect }