import {io} from "socket.io-client";
const socket = io.connect("http://172.16.1.94:5000");
export default socket;
