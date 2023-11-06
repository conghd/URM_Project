const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const { errorHandler } = require('./middleware/error_middleware')

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json())
//app.use(express.json());


// Routes
app.get("/", (req, res) => {
    res.status(200).json({message: "Hello World!"});
});

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

module.exports = app;