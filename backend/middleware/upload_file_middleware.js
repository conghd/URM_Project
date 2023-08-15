const util = require("util");
const multer = require("multer");
const sharp = require("sharp");
const crypto = require("crypto")

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
  };

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const uploadFiles = upload.array("images", 10);

const uploadImages = (req, res, next) => {
  uploadFiles(req, res, err => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
    } else if (err) {
      return res.send(err);
    }

    next();
  });
};

/**
 * Resize Images
 */

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file, index) => {
      //const filename = file.originalname.replace(/\..+$/, "");
      const filename = crypto.randomBytes(16).toString("base64url");
      const newFilename = `urm-${filename}-${Date.now()}-${index}.jpeg`;

      await sharp(file.buffer)
        .resize(640, 320)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/upload/images/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

const getResult = async (req, res) => {
  if (req.body.images.length <= 0) {
    return res.send(`You must select at least 1 image.`);
  }

  const images = req.body.images
    .map(image => "" + image + "")
    .join("");

  return res.send(`Images were uploaded:${images}`);
};


module.exports = {
  uploadImages: uploadImages,
  resizeImages: resizeImages,
  getResult: getResult
}