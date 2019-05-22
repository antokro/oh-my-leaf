import React, { useState } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import ListingFeed from '../components/FeedPage/ListingFeed';
import CreateListing from '../components/CreateListingPage/CreateListing';
import Footer from '../components/Footer/Footer';
const listingsArray = require('./mockListings.json');

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
  padding: 5px;
  overflow: scroll;
`;

const GridFooter = styled.footer`
  grid-row: 3;
`;

function App() {
  const [listings, setListings] = useState(listingsArray || []);

  function handlePublish(title, listingType) {
    console.log(title);
    console.log(listingType);
  }

  return (
    <GridBody>
      <GlobalStyles />
      <GridHeader>
        <Header />
      </GridHeader>
      <GridMain>
        <ListingFeed listings={listings} />
        <CreateListing handlePublish={handlePublish} />
      </GridMain>
      <GridFooter>
        <Footer />
      </GridFooter>
    </GridBody>
  );
}

export default App;
