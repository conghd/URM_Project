const sharp = require("sharp");
const crypto = require("crypto")

/**
 * Resize Images to reduce images' sizes
 */

const resizeImages = async (req, res, next) => {
  if (!req.files) return next();

  req.body.images = [];
  await Promise.all(
    req.files.map(async (file, index) => {
      //const filename = file.originalname.replace(/\..+$/, "");
      const filename = crypto.randomBytes(16).toString("base64url");
      const newFilename = `urm-${Date.now()}-${filename}.jpeg`;

      await sharp(file.buffer)
        //.resize(640, 320)
        .resize(640)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/upload/images/${newFilename}`);

      req.body.images.push(newFilename);
    })
  );

  next();
};

module.exports = {
  resizeImages: resizeImages,
}