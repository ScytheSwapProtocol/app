import { SocketContext } from "context/socket";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: white;
  font-size: 1.5em;
  width: 60%;
  height: 2em;
  background: #000000;
  border-bottom: 1px solid gray;
  border-top: 4px solid #424542;
  border-radius: 10px 10px 0 0;
`;

export const TradingWith = () => {
  const [roomId, setRoomId] = useState<string>("");
  const [roomLabel, setRoomLabel] = useState<string>("");
  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("room_connected", (docId: string, label: string) => {
      setRoomId(docId);
      setRoomLabel(label);
    });
    socket.on("room_dropped", () => {
      setRoomId("");
      setRoomLabel("");
    });

    return () => {
      socket.off("room_connected");
      socket.off("room_dropped");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Container>{`${roomLabel} - ${roomId}`}</Container>;
};
