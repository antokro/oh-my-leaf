import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { getLocal, setLocal } from '../services';
import uid from 'uid';
import GlobalStyles from '../Styles/GlobalStyles';
import Header from '../components/Header/Header';
import ListingFeed from '../components/FeedPage/ListingFeed';
import CreateListing from '../components/CreateListingPage/CreateListing';
import ListingDetails from '../components/DetailsPage/ListingDetails';
import Footer from '../components/Footer/Footer';
const user = require('./mockUsers.json');

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
  overflow: scroll;
  padding: 5px;
`;

const GridFooter = styled.footer`
  grid-row: 3;
`;

function App() {
  const [listings, setListings] = useState(getLocal('listings') || []);
  const [favourites, setFavourites] = useState(getLocal('favourites') || []);

  function handlePublish(title, description, listingType) {
    const newListing = {
      title: title,
      description: description,
      type: listingType,
      id: uid(),
      user: user[0].userId
    };
    setListings([...listings, newListing]);
  }
  useEffect(() => setLocal('listings', listings), [listings]);

  return (
    <BrowserRouter>
      <GridBody>
        <GlobalStyles />
        <GridHeader>
          <Header />
        </GridHeader>
        <GridMain>
          <Route
            exact
            path="/"
            render={props => (
              <ListingFeed
                listings={listings}
                user={{ userName: user[0].firstname, city: user[0].city }}
              />
            )}
          />
          <Route
            path="/create"
            render={props => (
              <CreateListing handlePublish={handlePublish} {...props} />
            )}
          />
          <Route
            path="/details/:id"
            render={props => (
              <ListingDetails
                content={listings}
                detailId={props.match.params.id}
              />
            )}
          />
        </GridMain>
        <GridFooter>
          <Footer />
        </GridFooter>
      </GridBody>
    </BrowserRouter>
  );
}

export default App;
