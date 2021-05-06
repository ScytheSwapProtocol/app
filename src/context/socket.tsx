import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect(process.env.REACT_APP_SOCKET_URL || "", {
  rejectUnauthorized: false,
  secure: true,
  forceNew: true,
});

socket.on("errors", (message: string) => {
  alert(`Error: ${message}`);
});

export const SocketContext = React.createContext<SocketIOClient.Socket>(socket);
