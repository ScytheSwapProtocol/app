import React, { useContext, useEffect, useState } from "react";

import AvatarImg from "assets/images/cryptopunk-transparent.png";
import { useEthers } from "@usedapp/core";

import styles from "./index.module.scss";
import { SocketContext } from "context/socket";
import useAllowance from "hooks/useAllowance";
import useAddressInfo from "hooks/useAddressInfo";
import AssetsPanel from "../AssetsPanel";

const TradeWindow = ({ children }: { children: any }) => {
  return <div className={styles.menu}>{children}</div>;
};

const CardLeft = () => {
  const { activateBrowserWallet, account, deactivate } = useEthers();
  const socket = useContext(SocketContext);
  const [roomLabel, setRoomLabel] = useState<string>();
  const [roomId, setRoomId] = useState<string>();
  const [server, setServer] = useState<string>();
  const { allowance, toggleAllowance } = useAllowance();
  const [addressInfo] = useAddressInfo();

  const handleCreateRoom = () => {
    if (account) return;
    const label = window.prompt("Input your room name");
    if (label) {
      setRoomLabel(label);
      activateBrowserWallet();
    }
  };

  const handleLeaveRoom = (isBroadCast = false) => {
    if (isBroadCast) {
      socket.emit("user_leave_room", { user_wallet: account, room_id: roomId });
    }
    setServer("");
    setRoomLabel("");
    setRoomId("");
    if (server === account) {
      deactivate();
    }
  };

  useEffect(() => {
    socket.on("owner_connected", (id: string, wallet: string) => {
      setServer(wallet);
      setRoomId(id);
    });

    socket.on("room_dropped", () => handleLeaveRoom());
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
    } else if (!account) {
      handleLeaveRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (addressInfo?.tokens?.length && server === account)
      console.log(`The owner has ${addressInfo?.tokens?.length} assets`);
  }, [addressInfo]);

  const renderActiveAccount = () => {
    return (
      <section className={styles.info}>
        <div className={styles.account}>
          <img className={styles.avatar} src={AvatarImg} alt="avatar" />
          {server && allowance[server] && <b>(Approved)</b>}
          <span>{server}</span>
        </div>
        {account === server && (
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
    <TradeWindow>
      <AssetsPanel owner={true} />
      <div className="card-header">
        <>
          {!server && !account ? (
            <button className={styles.button} onClick={handleCreateRoom}>
              Connect as Owner
            </button>
          ) : (
            (account === server || server) && renderActiveAccount()
          )}
        </>
      </div>
    </TradeWindow>
  );
};

export default CardLeft;
