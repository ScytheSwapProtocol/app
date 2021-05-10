import { useEthers } from "@usedapp/core";
import { SocketContext } from "context/socket";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./index.module.scss";

interface IMessage {
  sender: string;
  content: string;
  timestamp: number;
}

const ChatArea = () => {
  const { account } = useEthers();
  const { handleSubmit, register } = useForm();
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState<Array<IMessage>>([]);
  const containerRef = useRef<HTMLUListElement>(null);

  const handleSendMessage = (data: any, ev: any) => {
    socket.emit("send_message", {
      user_wallet: account,
      message: data.message,
    });
    ev.target.reset();
  };

  useEffect(() => {
    socket.on(
      "message_sent",
      (_: string, user_wallet: string, message: string, timestamp: number) => {
        setMessages((state) => [
          ...state,
          {
            sender: user_wallet,
            content: message,
            timestamp,
          },
        ]);
        containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
      }
    );

    return () => {
      socket.off("message_sent");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form className={styles.chat} onSubmit={handleSubmit(handleSendMessage)}>
      <ul ref={containerRef}>
        {account &&
          messages.map((message: IMessage) => (
            <li
              key={`${message.sender}${message.timestamp}`}
              className={`${
                account === message.sender ? styles.sent : styles.receive
              }`}
            >
              {message.content}
              <small>
                <i>{new Date(message.timestamp).toLocaleString()}</i>
              </small>
            </li>
          ))}
      </ul>
      <input
        type="text"
        name="message"
        defaultValue=""
        placeholder="Type message here"
        disabled={!account}
        className={styles.input}
        ref={register}
      />
    </form>
  );
};

export default ChatArea;
