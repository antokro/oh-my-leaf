import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { getLocal, setLocal } from '../services';
import uid from 'uid';
import GlobalStyles from '../misc/GlobalStyles';
import Header from '../components/header/Header';
import HomeFeed from '../components/feedPage/HomeFeed';
import FavouritesFeed from '../components/feedPage/FavouritesFeed';
import CreateListing from '../components/createListingPage/CreateListing';
import ListingDetails from '../components/detailsPage/ListingDetails';
import Footer from '../components/footer/Footer';
import SearchResultFeed from '../components/feedPage/SearchResultFeed';
import ListingsUserFeed from '../components/feedPage/ListingsUserFeed';
const users = require('./mockUsers.json');
const mockListings = require('./mockListings.json');

const GridBody = styled.section`
  display: grid;
  grid-template-rows: 58px auto 50px;
  height: 100vh;
`;

const GridHeader = styled.header`
  grid-row: 1;
`;

const GridMain = styled.main`
  grid-row: 2;
  overflow: scroll;
  padding: 5px;
  position: relative;
`;

const GridFooter = styled.footer`
  grid-row: 3;
`;

function App() {
  const [listings, setListings] = useState(
    getLocal('listings') || mockListings
  );
  const [favourites, setFavourites] = useState(getLocal('favourites') || []);
  const [typeFilter, setTypeFilter] = useState(getLocal('typeFilter') || 'all');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => setLocal('listings', listings), [listings]);
  useEffect(() => setLocal('favourites', favourites), [favourites]);
  useEffect(() => setLocal('typeFilter', typeFilter), [typeFilter]);

  const user = users[1];

  function handlePublish(title, description, listingType, img, price) {
    const newListing = {
      title: title,
      description: description,
      type: listingType,
      id: uid(),
      user: user.id_,
      img: img,
      price: price
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
    const user = users.find(user => user.id_ === listing.user);
    return { listing, user };
  }

  function findFavourites() {
    const favouriteListings = listings
      .slice()
      .filter(listing => favourites.includes(listing.id));
    return favouriteListings;
  }

  function findUserListings() {
    const userListings = listings
      .slice()
      .filter(listing => listing.user === user.id_);
    return userListings;
  }

  function handleTypeFilter(type) {
    setTypeFilter(type);
  }

  function handleDelete(id) {
    const indexListing = listings.findIndex(listing => listing.id === id);
    setListings([
      ...listings.slice(0, indexListing),
      ...listings.slice(indexListing + 1)
    ]);

    const indexFavourites = favourites.indexOf(id);
    let updateFavourites = favourites;
    if (favourites.includes(id)) {
      updateFavourites = [
        ...favourites.slice(0, indexFavourites),
        ...favourites.slice(indexFavourites + 1)
      ];
    }
    setFavourites(updateFavourites);
  }

  function showSearchResults(results, history, searchParam) {
    setSearchResult(results);
    history.push(`${user.username}/search/${searchParam}`);
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
            render={props => (
              <HomeFeed
                listings={listings}
                users={users}
                onFavourise={handleFavourise}
                favourites={favourites}
                onTypeFilter={handleTypeFilter}
                typeFilter={typeFilter}
                handleSearch={showSearchResults}
                {...props}
              />
            )}
          />
          <Route
            path="/:username/create"
            render={props => (
              <CreateListing handlePublish={handlePublish} {...props} />
            )}
          />
          <Route
            path="/:username/favourites"
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
              <ListingDetails
                content={findDetails(props.match.params.id)}
                {...props}
              />
            )}
          />
          <Route
            path="/:username/search/:searchParam"
            render={() => (
              <SearchResultFeed
                listings={searchResult}
                users={users}
                onFavourise={handleFavourise}
                favourites={favourites}
              />
            )}
          />
          <Route
            path="/:username/listings"
            render={props => (
              <ListingsUserFeed
                listings={findUserListings()}
                onDelete={handleDelete}
                {...props}
              />
            )}
          />
        </GridMain>
        <GridFooter>
          <Footer user={user} />
        </GridFooter>
      </GridBody>
    </BrowserRouter>
  );
}

export default App;
