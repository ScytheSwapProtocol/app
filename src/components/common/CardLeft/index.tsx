import React, { useContext, useEffect, useState } from "react";

import AvatarImg from "assets/images/cryptopunk-transparent.png";
import { useEthers } from "@usedapp/core";

import styles from "./index.module.scss";
import { SocketContext } from "context/socket";

const TradeWindow = ({ children }: { children: any }) => {
  return <div className={styles.menu}>{children}</div>;
};

export const CardLeft = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const socket = useContext(SocketContext);
  const [roomLabel, setRoomLabel] = useState<string>();
  const [server, setServer] = useState<string>();

  const handleCreateRoom = () => {
    if (account) return;
    const label = window.prompt("Input your room name");
    if (label) {
      setRoomLabel(label);
      activateBrowserWallet();
    }
  };

  const handleLeaveRoom = () => {
    setServer("");
    deactivate();
  };

  useEffect(() => {
    socket.on("owner_connected", (_: string, wallet: string) => {
      setServer(wallet);
    });

    socket.on("room_dropped", handleLeaveRoom);
    socket.on("errors_connect", (message: string) => {
      alert(message);
      handleLeaveRoom();
    });

    return () => {
      socket.off("owner_connected");
      socket.off("errors_connect");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (account && roomLabel) {
      socket.emit("user_create_room", {
        user_wallet: account,
        room_label: roomLabel,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  return (
    <TradeWindow>
      <div className="card-header">
        <>
          {!server && !account ? (
            <button className={styles.connect} onClick={handleCreateRoom}>
              Connect as Owner
            </button>
          ) : (
            (account === server || server) && (
              <div className={styles.account}>
                <img className={styles.avatar} src={AvatarImg} alt="avatar" />
                <span>{server}</span>
              </div>
            )
          )}
        </>
      </div>
    </TradeWindow>
  );
};
