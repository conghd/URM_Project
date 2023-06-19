const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const UserModel = require('../../models/user_model')

const getRandomInt = ( min, max ) => {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}

const generateActivationCode = () => {
  var tokens = "0123456789",
  chars = 6,
  segments = 1,
  keyString = "";

  for( var i = 0; i < segments; i++ ) {
    var segment = "";

    for( var j = 0; j < chars; j++ ) {
      var k = getRandomInt( 0, 9 );
      segment += tokens[ k ];
    }

    keyString += segment;

    if( i < ( segments - 1 ) ) {
      keyString += "-";
    }
  }

  //return keyString;
  return "123456";
}

// @desc    Create new user
// @route   POST  /user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  console.log("UserController::registerUser");
  const { name, email, password } = req.body;

  if (!name|| !email || !password) {
    res.status(400).json({
      code: 2,
      message: "Name, email and password must be not empty",
    });
    return;
  }
  
  // Check if user exists
  const existUser = await UserModel.findOne({ email })
  if (existUser) {
    res.status(400).json({
      code: 1,
      message: `User with email ${email} already existed.`,
    });
    return;
  }
  const salt = await bcrypt.genSalt(10)
  const hashedPw = await bcrypt.hash(password, salt)
  //const activation_code = await bcrypt.hash(email, salt)
  const activation_code = generateActivationCode();
  
  const user = await UserModel.create({
    name,
    email,
    password: hashedPw,
    activated: true,
    activation_code: activation_code
  }, function(error, result) {
    if (error) {
      res.status(400).json({
        code: 2,
        message: "There was an issue with provided information. Please try again."
      });
    } else {
      res.status(201).json({
        _id: result._id,
        name: result.name,
        email: result.email,
        token: generateToken(result.id)
      })
    }
  })
})

// @desc    Authenticate user
// @route   POST /user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  console.log("UserController::loginUser");
  const {email, password} = req.body
  
  const user = await UserModel.findOne({ email })
  
  if (user) {

    if (await bcrypt.compare(password, user.password)) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        activated: user.activated,
        token: generateToken(user.id)
      });
    } else {
      res.status(400).json({
        code: 1,
        message: "Invalid credentials, please try again.",
      })

    }
  } else {
    res.status(400).json({
      code: 1,
      message: `User with email ${email} does not exist.`,
    })
  }
})

// @desc    Authenticate user
// @route   POST /user/login
// @access  Public
const activateAccount = asyncHandler(async (req, res) => {
  console.log("UserController::activateAccount");
  const {email, activationCode } = req.body
  
  const user = await UserModel.findOne({ email: email })
  
  if (user && activationCode === user.activation_code) {
    user.activated = true;
    await user.save();
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      activated: user.activated,
      token: generateToken(user.id)
    })
  } else {
    res.status(400).json({
      code: 1,
      message: "Invalid activation code",
    })
  }
})

// @desc    List users
// @route   POST  /user/list
// @access  Private
const listUser = asyncHandler(async (req, res) => {
  console.log("UserController::listUser")
  const users = await UserModel.find()
                  .select("-password")
                  .select("-activated")
                  .select("-activation_code")
                  .select("-__v");
  
  return res.send(users);
})

// @desc    log out
// @route   GET /user/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  console.log("UserController::loggoutUser");
  res.sendStatus(200).json({
    code: 0,
    message: "Logged out successfully",
  });
})


const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}
module.exports = {
  registerUser,
  loginUser,
  listUser,
  logoutUser,
  activateAccount,
}