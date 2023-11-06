const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const multer = require('multer')
const path = require('path')
const logger = require("../../util/logger")
const rooms = require('./rooms')

const getChatRooms = asyncHandler(async (req, res) => {
  logger.info("ChatController::getChatRooms()")
  //const user = req.user;
  res.json({data: chatRooms});
})
const generateID = () => Math.random().toString(36).substring(2, 10);
let chatRooms = rooms;

const createRoom = asyncHandler(async (socket, name) => {
    logger.info("ChatController::createRoom: %s", name);
    socket.join(name);
    chatRooms.unshift({ id: generateID(), name, messages: [] });
    logger.info("roomList: %s", JSON.stringify(chatRooms))
		socket.emit("roomList", chatRooms);
});

const findRoom = asyncHandler(async (socket, id) => {
    logger.info("ChatController::findRoom: %s", id);
		let result = chatRooms.filter((room) => room.id == id);
    let messages = result.length > 0 ? result[0].messages : [];
		socket.emit("foundRoom", messages);
});

const newMessage = asyncHandler(async (socket, data) => {
    logger.info("ChatController::newMessage: %s", JSON.stringify(data)); 
    const { room_id, message, user, timestamp } = data;
		let result = chatRooms.filter((room) => room.id == room_id);
		const newMessage = {
			id: generateID(),
			text: message,
			user,
			time: timestamp,
		};
		logger.info("New Message", newMessage);

		socket.to(result[0].name).emit("roomMessage", newMessage);
		result[0].messages.push(newMessage);

		socket.emit("roomsList", chatRooms);
		socket.emit("foundRoom", result[0].messages);

});

const onSocketConnection = asyncHandler(async (socket) => {
  logger.info(`socketID: ${socket.id} user just connected!`);

  socket.on("createRoom", (name) => { createRoom(socket, name); });

  socket.on("findRoom", (id) => {findRoom(socket, id)});

  socket.on("newMessage", (data) => { newMessage(socket, data) });

  socket.on("typing", (data) => {
    socket.broadcast.emit("typing", data);
  });

  socket.on("disconnect", () => {
    socket.disconnect()
    logger.info("A user disconnected");
  });
});

module.exports = {
  getChatRooms,
  onSocketConnection,
}