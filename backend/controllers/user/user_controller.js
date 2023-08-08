const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const asyncHandler = require('express-async-handler')
const logger = require("../../util/logger")
const UserModel = require('../../models/user_model')
const mailer = require('nodemailer');
const smtp = require('nodemailer-smtp-transport');


const sendMail = asyncHandler(async (data) => {
  logger.info("UserController::sendmail -" + JSON.stringify(data));
  const transport = mailer.createTransport(
    smtp({
      host: 'in.mailjet.com',
      port: 2525,
      auth: {
        user: process.env.MAILJET_API_KEY || '1f6dab035aa02a0ed87919d96d0a2313',
        pass: process.env.MAILJET_API_SECRET || '5c06eb77c2fef62f31b27b37da44d9a4',
      },
    })
  );

  const json = await transport.sendMail({
    from: data.from, // From address
    to: data.to, // To address
    subject: data.subject, // Subject
    text: data.text, // Content
  });

  logger.info(json)

}) 

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

  return keyString;
  //return "123456";
}

// @desc    Create new user
// @route   POST  /user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  logger.info("UserController::registerUser(%s, %s, %s)", name, email, password);

  let message = "";
  if (!name) message += "Name";
  if (!email) message += message === "" ? "Email" : ", email";
  if (!password) message += (message === "") ? "Password": ", password";
  message += " must be not empty. Please try again."

  if (!name|| !email || !password) {
    res.status(400).json({
      message: message,
    });
    return;
  }
  
  // Check if user exists
  const existUser = await UserModel.findOne({ email })
  if (existUser) {
    res.status(400).json({
      message: `User with email ${email} already existed. Please try another.`,
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
    activated: false,
    activation_code: activation_code,
    verification_code: activation_code,
    verified: false

  }, function(error, result) {
    if (error) {
      logger.error(error)
      res.status(500).json({
        email: email,
        message: "There was a server issue. Please try again.",
        error: error,
      });
    } else {
      logger.info("UserController::registerUser, CODE: %s", activation_code)
      res.status(200).json({
        email: email,
        message: "Your account has been created successfully."
      })
    }
  })
})

// @desc    Authenticate user
// @route   POST /user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  logger.info("UserController::loginUser");
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
        message: "Invalid credentials. Please try again.",
      })

    }
  } else {
    res.status(400).json({
      code: 1,
      message: `User ${email} does not exist. Please try another.`,
    })
  }
})

// @desc    Activate account
// @route   POST /user/activate
// @access  Public
const resendCode = asyncHandler(async (req, res) => {
  const {email, type } = req.body
  logger.info("UserController::ResendCode(%s, %s)", email, type);
  
  const user = await UserModel.findOne({ email: email })
  let status_code = 200
  let message = ''
  let code = ''
  
  if (user) {
    if (type === 'ACTIVATION') {
      user.activation_code = generateActivationCode();
      code = user.activation_code
    } else if (type === 'FORGOT_PASSWORD') {
      user.verification_code = generateActivationCode();
      code = user.verification_code
    } else {
      // DO NOTHING
    }

    logger.info("UserController::resendCode(%s, %s, %s)", email, type, code);
    await user.save();
    message = `A verification code has been sent to the email ${email}`
  } else {
    status_code = 400
    message = `The user ${email} does not exist.`
  }

  const mailData = {
    from: 'conghd@uregina.ca',
    to: 'conghd@uregina.ca',
    subject: '[URM] Verification Code',
    text: 'Your verification code is ' + user.activation_code
  }

  sendMail(mailData)

  res.status(status_code).json({
    email: email,
    type: type,
    message: message,
  });
})

// TO BE REMOVED
// @desc    Activate account
// @route   POST /user/activate
// @access  Public
const activateAccount = asyncHandler(async (req, res) => {
  logger.info("UserController::activateAccount");
  const {email, code} = req.body
  
  const user = await UserModel.findOne({ email: email })
  
  if (user && code === user.activation_code) {
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
      message: "Invalid activation code. Please try again.",
    })
  }
})

// @desc    Forgot Password
// @route   POST /user/forgot_password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  const {email} = req.body
  logger.info("UserController::forgotPassword(%s)", email);
  
  const user = await UserModel.findOne({ email: email })
  
  let status_code = ""
  let message = ""
  if (user) {
    user.verified = false
    user.verification_code = generateActivationCode();
    await user.save();

    status_code = 200
    message = `A code has been sent to the email ${email}.`

    logger.info("UserController::forgotPassword, VERIFICATION_CODE: " + user.verification_code)
  } else {
    status_code = 400
    message = `The user ${email} does not exist.`
  }

  res.status(status_code).json({
    email: email,
    message: message,
  })
})

// @desc    Verify account
// @route   POST /user/verify_account
// @access  Public
const verifyAccount = asyncHandler(async (req, res) => {
  const {email, code, type} = req.body
  logger.info("UserController::verifyAccount(%s, %s, %s)", email, code, type);
  
  const user = await UserModel.findOne({ email: email })
  
  let status_code = "", message = ""
  if (user) {
    if (type == "FORGOT_PASSWORD") {
      if (code === user.verification_code) {
        user.verified = true
        status_code = 200
        message = `Account ${email} has been verified successfully.`

        await user.save();
      } else {
        status_code = 400
        message = `Verification code is not correct. Please try again.`
      }
    } else if (type === "ACTIVATION") {
      if (code === user.activation_code) {
        user.activated = true;
        status_code = 200
        message = `Account ${email} has been activated successfully.`

        await user.save();
      } else {
        status_code = 400
        message = `Activation code is not correct. Please try again.`
      }
    } else {
      // NOTHING TO DO
      status_code = 400
      message = "Invalid action. Please try again"
    }
  } else {
    status_code = 400
    message = `The user ${email} does not exist.`
  }

  res.status(status_code).json({
    email: email,
    message: message
  })
})

// @desc    Reset password
// @route   POST  /user/reset_password
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  logger.info("UserController::resetPassword(%s, %s)", email, password);

  let message = "";
  if (!email) message += message === "" ? "Email" : ", email";
  if (!password) message += (message === "") ? "Password": ", password";
  message += " must be not empty. Please try again."

  if (!email || !password) {
    res.status(400).json({
      message: message,
    });
    return;
  }
  
  // Check if user exists
  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(400).json({
      message: `User ${email} does not exist. Please try again.`,
    });
    return;
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPw = await bcrypt.hash(password, salt)
  user.password = hashedPw
  await user.save()
  
  res.status(200).json({
    email: email,
    message: "Your password has been changed successfully."
  })
})

// @desc    Change password
// @route   POST  /user/change_password
// @access  Public
const changePassword = asyncHandler(async (req, res) => {
  const { email, password, new_password } = req.body;
  logger.info("UserController::resetPassword(%s, %s, %s)", email, password, new_password);

  let message = "";
  if (!email) message += message === "" ? "Email" : ", email";
  if (!password) message += (message === "") ? "Password": ", password";
  if (!new_password) message += (message === "") ? "New password": ", new password";
  message += " must be not empty. Please try again."

  if (!email || !password) {
    res.status(400).json({
      message: message,
    });
    return;
  }
  
  // Check if user exists
  const user = await UserModel.findOne({ email })
  if (!user) {
    res.status(400).json({
      message: `User ${email} does not exist. Please try again.`,
    });
    return;
  }

  /*
  * PAY ATTENTION HERE (NOT OPERATOR)
  */
  if (!await bcrypt.compare(password, user.password)) {
    res.status(400).json({
      email: email,
      message: "Invalid credentials. Please try again.",
    })
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPw = await bcrypt.hash(new_password, salt)
  user.password = hashedPw
  await user.save()
  
  res.status(200).json({
    email: email,
    message: "Your password has been changed successfully."
  })
})

// @desc    List users
// @route   POST  /user/list
// @access  Private
const listUser = asyncHandler(async (req, res) => {
  logger.info("UserController::listUser")
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
  logger.info("UserController::loggoutUser");
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
  forgotPassword,
  verifyAccount,
  resendCode,
  resetPassword,
  changePassword,
}