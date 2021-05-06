import React from "react";
import socketio from "socket.io-client";

const SOCKET_URL = "http://192.168.0.63:8000/";

export const socket = socketio.connect(SOCKET_URL, {
  rejectUnauthorized: false,
  secure: true,
  forceNew: true,
});

socket.on("errors", (message: string) => {
  alert(`Error: ${message}`);
});

export const SocketContext = React.createContext<SocketIOClient.Socket>(socket);
