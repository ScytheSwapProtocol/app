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
  border-radius: 0 0 0 10px;
  border-left: 4px solid #424542;
  border-bottom: 4px solid #424542;
  border-right: 0.5px solid gray;
  padding: 1em 0.5em;
  background: linear-gradient(to bottom, #000000 0%, #8e8ea7 42%, #ffffff 100%);
`;

const Header = styled.h1 `
  font-size: 1.3em;
  margin-left: 1em;
  color: white;
`

const Connect = styled.button `
    border: 1.5px solid white;
    border-radius: 15px;
    color: white;
    background: transparent;
    padding: 0.5em 1em;
    font-size: 1em;
    margin-top: 0.7em;
    float: left;
    margin-left: 1em;
`

const Avatar = styled.img `
    width: 4em;
    border: 2px solid white;
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
