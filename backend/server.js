const express = require("express");
const cors = require("cors")
const multer = require("multer")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require('path')
const { errorHandler } = require('./middleware/error_middleware')
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

require("dotenv").config({ path: "./config.env"  });
const port = process.env.PORT || 5000;
const mongoURI = process.env.ATLAS_URI;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())


//app.use(express.json());

//app.use(require("./routes/record"));
//app.use(require("./routes/user"));
// get driver connection
//const dbo = require("./db/conn");

// Routes
app.use('/api/user', require('./routes/user_routes'))
app.use('/api/post', require('./routes/post_routes'))
app.use('/api/advert', require('./routes/advert_routes'))
app.use('/api/comment', require('./routes/comment_routes'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
const upload = multer({dest: "public/upload/images"})
app.post("/api/post/create", upload.array("files"), createPost2);
function createPost2(req, res) {
  console.log("createPost2");
  console.log(req.body);
  console.log(req.files);
  res.json({"message": "OK"})
}
*/
app.use(errorHandler)

app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/public/upload/images'));
// Add new
/*
app.use(express.static(path.join(__dirname, 'client')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
*/
app.listen(port, () => {
  // perform a database connection when server starts
    //dbo.connectToServer(function (err) {
    //    if (err) console.error(err);
    //});
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once("open", function() {
      console.log("Connected to MongoDB successfully.");
    });

    console.log(`Server is running on port: ${port}`);
});
