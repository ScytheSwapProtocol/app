import styled from "styled-components";
import "./App.css";

import TradingWith from "components/common/TradingWith";
import CardLeft from "components/common/CardLeft";
import CardRight from "components/common/CardRight";
import ChatArea from "components/ChatArea";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const TradingContainer = styled.div`
  margin-top: 34px;
`;

const MainContent = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  position: relative;
`;

function App() {
  return (
    <Container>
      {/* <Header /> */}
      <TradingContainer>
        <TradingWith />
      </TradingContainer>
      <MainContent>
        <CardLeft />
        <CardRight />
        <ChatArea />
      </MainContent>
    </Container>
  );
}

export default App;
