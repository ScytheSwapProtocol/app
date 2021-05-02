import React, { useState } from "react";
import styled from "styled-components";
import { BuyOrSellButton } from "../button/BuyOrSell";

import AvatarImg from '../../../assets/images/cryptopunk-transparent.png';

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1em;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30%;
  height: 60vh;
  border-radius: 8px 0 0 8px;
  border-right: 0.5px solid black;
  padding: 1em 0.5em;
  background: rgb(194,193,196);
  background: linear-gradient(0deg, rgba(194,193,196,1) 0%, rgba(226,226,235,1) 35%, rgba(255,255,255,1) 100%);
  box-shadow:  -20px 20px 60px #bebebe,
             20px -20px 60px #ffffff;
`;

const Header = styled.h1 `
  font-size: 1.3em;
  margin-left: 1em;
  color: black;
`

const Connect = styled.button `
    border: 1.5px solid black;
    border-radius: 15px;
    color: black;
    background: transparent;
    padding: 0.5em 1em;
    font-size: 1em;
    margin-top: 0.7em;
    float: left;
    margin-left: 1em;
`

const Avatar = styled.img `
    width: 4em;
    border: 2px solid black;
    border-radius: 50%;
    float: left;
    margin-left: 1em;
`

const TradeWindow = ({ children }: { children: any }) => {
  return <Menu>{children}</Menu>;
};

export const CardLeft = () => {
  const [connected, setConnected] = useState(false);

  return (
    <TradeWindow>
      <div className="card-header">
        <div onClick={() => {
            setConnected(!connected)
                }}>
              {!connected ? <Connect>Connect</Connect> : <Avatar src={ AvatarImg } /> }
          </div>
        </div>
      {/* <ButtonWrapper>
        <BuyOrSellButton>Accept</BuyOrSellButton>
        <BuyOrSellButton>Decline</BuyOrSellButton>
      </ButtonWrapper> */}
    </TradeWindow>
  )
}
