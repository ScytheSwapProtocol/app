import React from "react";
import styled from "styled-components";

const TradeButton = styled.button`
  cursor: pointer;
  width: 4.5rem;
  height: 2.5rem;
  background-color: snowwhite;
  color: black;
  margin: 0.1rem;
`;

export const BuyOrSellButton = ({ children }: { children: string }) => {
  return <TradeButton>{children}</TradeButton>;
};
