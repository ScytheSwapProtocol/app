import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
  overflow: hidden;
  margin: 2rem;
  padding: 10px;
  border: 1px solid red;
`;

const Menu = styled.div`
  padding: 20px;
  width: 75%;
  height: 38rem;
  background: linear-gradient(to bottom, #000000 0%, #8e8ea7 42%, #ffffff 100%);
  border-radius: 8px;
  border: 1px solid #424542;
  box-shadow: 4px 4px #e7dfe7, -4px -4px #e7dfe7, 4px -4px #e7dfe7,
    -4px 4px #e7dfe7, 0 -2px #9c9a9c, -2px 0 #7b757b, 0 2px #424542;
`;

const TradeWindow = ({ children }: { children: string }) => {
  return <Menu>{children}</Menu>;
};

export const MainCard = () => (
  <Wrapper>
    <TradeWindow>Scytheswap v1</TradeWindow>
  </Wrapper>
);
