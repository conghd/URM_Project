const util = require("util");
const multer = require("multer");
const { uuid } = require('uuidv4');

/**  */
const DIR = __dirname + './public/upload/images';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("MIDDLEWARE::destination");
        console.log(__dirname + './public/upload/images');
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        console.log("MIDDLEWARE::filename")
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        console.log("MIDDLEWARE::filename: " + fileName)
        //cb(null, uuidv4() + '-' + fileName)
        cb(null, uuid() + '-' + fileName)
    }
});
var uploadFile = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        console.log("MIDDLEWARE::uploadFIle::fileFilter")
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})//.array("images", 16);

//let uploadFileMiddleware = util.promisify(uploadFile);
//module.exports = uploadFileMiddleware;
module.exports = uploadFile;