import { useEthers } from "@usedapp/core";
import React, { useContext, useEffect, useState } from "react";

import AvatarImg from "assets/images/cryptopunk2.png";

import styles from "./index.module.scss";
import { SocketContext } from "context/socket";

export const CardRight = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const socket = useContext(SocketContext);
  const [client, setClient] = useState<string>();
  const [roomId, setRoomId] = useState<string>();

  const handleJoinRoom = () => {
    if (account) return;
    const id = window.prompt("Input your room id to connect");
    if (id) {
      setRoomId(id);
      activateBrowserWallet();
    }
  };

  const handleLeaveRoom = () => {
    setClient("");
    deactivate();
  };

  useEffect(() => {
    socket.on("participant_joined", (_: string, wallet: string) => {
      setClient(wallet);
    });
    socket.on("room_dropped", handleLeaveRoom);
    socket.on("participant_left", handleLeaveRoom);
    socket.on("errors_connect", (message: string) => {
      alert(message);
      handleLeaveRoom();
    });

    return () => {
      socket.off("participant_joined");
      socket.off("participant_left");
      socket.off("errors_connect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account && roomId) {
      socket.emit("user_join_room", {
        user_wallet: account,
        room_id: roomId,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <div className={styles.card}>
      <div className="card-header">
        <>
          {!client && !account ? (
            <button className={styles.connect} onClick={handleJoinRoom}>
              Connect as Participant
            </button>
          ) : (
            (account === client || client) && (
              <div className={styles.account}>
                <img className={styles.avatar} src={AvatarImg} alt="avatar" />
                <span>{client}</span>
              </div>
            )
          )}
        </>
      </div>
    </div>
  );
};
