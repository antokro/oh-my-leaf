import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import AdFeed from '../components/FeedPage/AdFeed.js';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Inconsolata', monospace;
}
`;

const StyledBody = styled.section`
  display: grid;
  grid-template-rows: 55px auto 55px;
  text-align: center;
  height: 100vh;
`;

const StyledHeader = styled.header`
  grid-row: 1;
`;

const StyledMain = styled.main`
  grid-row: 2;
  overflow: scroll;
`;

const StyledFooter = styled.footer`
  grid-row: 3;
`;

function App() {
  //const [adList, setAdList] = useState(ads);
  return (
    <StyledBody>
      <GlobalStyles />
      <StyledHeader>{'Header'}</StyledHeader>
      <StyledMain>
        <AdFeed />
      </StyledMain>
      <StyledFooter>{'Footer'}</StyledFooter>
    </StyledBody>
  );
}

export default App;
