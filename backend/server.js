const mongoose = require("mongoose")
const socketIO = require("socket.io");
const logger = require('./util/logger')
const { onSocketConnection } = require("./controllers/chat/chat_controller");
const app = require("./app");

require("dotenv").config({ path: "./config.env"  });
const port = process.env.PORT || 5000;
const mongoURI = process.env.ATLAS_URI;

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