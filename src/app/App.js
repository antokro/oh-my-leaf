import React, { useState } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components';
import Header from '../components/Header/Header';
import ListingFeed from '../components/FeedPage/ListingFeed';
import CreateListing from '../components/CreateListingPage/CreateListing';
import ListingDetails from '../components/DetailsPage/ListingDetails';
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
  grid-template-rows: 58px auto 55px;
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
    const newListing = { title: title, type: listingType, id: '3' };
    setListings([...listings, newListing]);
  }

  function showDetailsPage() {
    console.log('DetailsPage');
  }

  return (
    <BrowserRouter>
    <GridBody>
      <GlobalStyles />
      <GridHeader>
        <Header />
      </GridHeader>
      <GridMain>
        <Route path='/home' render={props => <ListingFeed listings={listings} showDetails={showDetailsPage} /> } />
        <Route path='/create' render={props => <CreateListing handlePublish={handlePublish}  /> }/>
        <Route path='/details/:id' render={props => <ListingDetails content={listings[0]} />} /> 
      </GridMain>
      <GridFooter>
        <Footer />
      </GridFooter>
    </GridBody>
    </BrowserRouter>
  );
}

export default App;
