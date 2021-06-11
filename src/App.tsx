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

const ChatBoxContainer = styled.div`
  bottom: 0px;
  left: 0px;
  position: absolute;
`

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
      </MainContent>
      <ChatBoxContainer>
        <ChatArea />
      </ChatBoxContainer>
    </Container>
  );
}

export default App;
