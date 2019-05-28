import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { getLocal, setLocal } from '../services';
import uid from 'uid';
import GlobalStyles from '../misc/GlobalStyles';
import Header from '../components/header/Header';
import ListingFeed from '../components/feedPage/ListingFeed';
import FavouritesFeed from '../components/feedPage/favouritesFeed';
import CreateListing from '../components/createListingPage/CreateListing';
import ListingDetails from '../components/detailsPage/ListingDetails';
import Footer from '../components/footer/Footer';
const users = require('./mockUsers.json');
const mockListings = require('./mockListings.json');

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
  const [listings, setListings] = useState(
    getLocal('listings') || mockListings
  );
  const [favourites, setFavourites] = useState(getLocal('favourites') || []);

  useEffect(() => setLocal('listings', listings), [listings]);
  useEffect(() => setLocal('favourites', favourites), [favourites]);

  function handlePublish(title, description, listingType, img) {
    const newListing = {
      title: title,
      description: description,
      type: listingType,
      id: uid(),
      user: users[1].userId,
      img: img
    };
    setListings([...listings, newListing]);
  }

  function handleFavourise(id) {
    const index = favourites.indexOf(id);

    setFavourites(NewFavourites(index, id));
  }

  function NewFavourites(index, id) {
    if (favourites.includes(id)) {
      return [...favourites.slice(0, index), ...favourites.slice(index + 1)];
    } else {
      return [...favourites, id];
    }
  }

  function findDetails(id) {
    const listing = listings.find(listing => listing.id === id);
    const user = users.find(user => user.userId === listing.user);
    return { listing, user };
  }

  function findFavourites() {
    const favouriteListings = listings
      .slice()
      .filter(listing => favourites.includes(listing.id));
    return favouriteListings;
  }

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
            render={() => (
              <ListingFeed
                listings={listings}
                users={users}
                onFavourise={handleFavourise}
                favourites={favourites}
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
            path="/favourites"
            render={() => (
              <FavouritesFeed
                listings={findFavourites()}
                users={users}
                onFavourise={handleFavourise}
                favourites={favourites}
              />
            )}
          />
          <Route
            path="/details/:id"
            render={props => (
              <ListingDetails content={findDetails(props.match.params.id)} />
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
