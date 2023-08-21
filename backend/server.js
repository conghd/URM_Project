const express = require("express");
const cors = require("cors")
const multer = require("multer")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const path = require('path')
const { errorHandler } = require('./middleware/error_middleware')
const app = express();
const http = require("http").Server(app);
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const socketIO = require("socket.io");
const logger = require('./util/logger')
const { onSocketConnection } = require("./controllers/chat/chat_controller");

require("dotenv").config({ path: "./config.env"  });
const port = process.env.PORT || 5000;
const mongoURI = process.env.ATLAS_URI;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
//app.use(express.json());


// Routes
app.use('/api/user', require('./routes/user_routes'))
app.use('/api/advert', require('./routes/advert_routes'))
app.use('/api/listing', require('./routes/listing_routes'))
app.use('/api/chat', require('./routes/chat_routes'))
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
const server = app.listen(port, () => {
  // perform a database connection when server starts
    mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    var db = mongoose.connection;
    //db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.on('error', () => {
      logger.error("MongoDB connection error.");
      //console.log("MongoDB connection error.");
    })

    db.once("open", function() {
      logger.info("Connected to MongoDB successfully.");
      //console.log("Connected to MongoDB successfully.");
    });

    logger.info(`Server is running on port: ${port}`);
    //logger.info(`[2] Server is running on port: %s`, port);
    
    //console.log(`Server is running on port: ${port}`);
});

/**
 * Socket for chat
 */


const io = socketIO(server);
io.on("connection", onSocketConnection);