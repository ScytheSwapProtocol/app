import { useEthers } from "@usedapp/core";
import React, { useContext, useEffect, useState } from "react";

import AvatarImg from "assets/images/cryptopunk2.png";

import styles from "./index.module.scss";
import { SocketContext } from "context/socket";
import useAllowance from "hooks/useAllowance";

const CardRight = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const { allowance, toggleAllowance } = useAllowance();
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

  const handleLeaveRoom = (isBroadCast = false) => {
    if (isBroadCast) {
      //   alert(`${account} ${roomId}`);
      console.log(account, roomId, isBroadCast);
      socket.emit("user_leave_room", { user_wallet: account, room_id: roomId });
    }
    setClient("");
    setRoomId("");
    if (account === client && account) {
      deactivate();
    }
  };

  useEffect(() => {
    socket.on("participant_joined", (id: string, wallet: string) => {
      setClient(wallet);
      setRoomId(id);
    });
    socket.on("room_dropped", () => handleLeaveRoom());
    socket.on("participant_left", () => handleLeaveRoom());
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
    } else if (!account) {
      handleLeaveRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  const renderActiveAccount = () => {
    return (
      <section className={styles.info}>
        <div className={styles.account}>
          <img className={styles.avatar} src={AvatarImg} alt="avatar" />
          {client && allowance[client] && <b>(Approved)</b>}
          <span>{client}</span>
        </div>
        {account === client && (
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={() => handleLeaveRoom(true)}
            >
              Leave
            </button>
            <button
              className={styles.button}
              onClick={() => toggleAllowance(roomId)}
            >
              {account && allowance[account] ? "Decline" : "Approve"}
            </button>
          </div>
        )}
      </section>
    );
  };

  return (
    <div className={styles.card}>
      <div className="card-header">
        <>
          {!client && !account ? (
            <button className={styles.button} onClick={handleJoinRoom}>
              Connect as Participant
            </button>
          ) : (
            (account === client || client) && renderActiveAccount()
          )}
        </>
      </div>
    </div>
  );
};

export default CardRight;
