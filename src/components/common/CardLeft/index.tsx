import React, { useState } from "react";
import { BuyOrSellButton } from "../button/BuyOrSell";

import AvatarImg from "../../../assets/images/cryptopunk-transparent.png";
import { useEthers } from "@usedapp/core";

import styles from "./index.module.scss";

const TradeWindow = ({ children }: { children: any }) => {
  return <div className={styles.menu}>{children}</div>;
};

export const CardLeft = () => {
  const { activateBrowserWallet, account } = useEthers();

  return (
    <TradeWindow>
      <div className="card-header">
        <div
          onClick={() => {
            activateBrowserWallet();
          }}
        >
          {!account ? (
            <button className={styles.connect}>Connect</button>
          ) : (
            <div className={styles.account}>
              <img className={styles.avatar} src={AvatarImg} alt="avatar" />
              <span>{account}</span>
            </div>
          )}
        </div>
      </div>
      {/* <ButtonWrapper>
        <BuyOrSellButton>Accept</BuyOrSellButton>
        <BuyOrSellButton>Decline</BuyOrSellButton>
      </ButtonWrapper> */}
    </TradeWindow>
  );
};
