import React from "react";
import styled from "styled-components";
import "./App.css";

import { TradingWith } from "../src/components/common/TradingWith/index";
import { CardLeft } from "../src/components/common/CardLeft/index";
import { CardRight } from "../src/components/common/CardRight/index";

const Container = styled.div `
  display: flex;
  flex-direction: column;
`

const TradingContainer = styled.div `
  transform: translateY(13em);
`

const MainContent = styled.div `
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

function App() {
  return (
    <Container>
      <TradingContainer>
        <TradingWith />
      </TradingContainer>
        <MainContent>
          <CardLeft />
          <CardRight />
        </MainContent>
     </Container>
  )
}

export default App;
