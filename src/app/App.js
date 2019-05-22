import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import AdFeed from '../components/FeedPage/AdFeed.js';
import Footer from '../components/Footer/Footer';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'PT Mono', monospace;
}
`;

const GridBody = styled.section`
  display: grid;
  grid-template-rows: 55px auto 55px;
  height: 100vh;
`;

const GridHeader = styled.header`
  grid-row: 1;
`;

const GridMain = styled.main`
  grid-row: 2;
  overflow: scroll;
`;

const GridFooter = styled.footer`
  grid-row: 3;
`;

function App() {
  //const [adList, setAdList] = useState(ads);
  return (
    <GridBody>
      <GlobalStyles />
      <GridHeader>
        <Header />
      </GridHeader>
      <GridMain>
        <AdFeed />
      </GridMain>
      <GridFooter>
        <Footer />
      </GridFooter>
    </GridBody>
  );
}

export default App;
