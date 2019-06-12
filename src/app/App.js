import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import {
  getLocal,
  setLocal,
  getData,
  postListing,
  toggleFavourites,
  getFavouritesByUserId,
  getListingsByUserId
} from '../services';
import GlobalStyles from '../components/common/Styles/GlobalStyles';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import FavouritesList from '../components/Favourites/FavouritesList';
import CreateForm from '../components/Create/CreateForm';
import DetailsPage from '../components/Details/DetailsPage';
import Footer from '../components/Footer/Footer';
import SearchResult from '../components/Search/SearchResult';
import ListingOverview from '../components/UserProfile/ListingOverview';

const localUsers = require('./mockUsers.json');

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
  const [listings, setListings] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [typeFilter, setTypeFilter] = useState(getLocal('typeFilter') || 'all');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    getData('listings')
      .then(data => setListings(data))
      .catch(error => console.log(error));

    setLocal('localUsers', localUsers);

    getFavouritesByUserId(localUsers[1]._id).then(favourites => {
      setFavourites(favourites);
    });
  }, []);

  useEffect(() => setLocal('typeFilter', typeFilter), [typeFilter]);

  function handlePublish(title, description, type, image, price, swapTags) {
    const newListing = {
      title,
      description,
      type,
      user_id: localUsers[1]._id,
      img_path: image,
      price,
      swap_tags: swapTags
    };
    postListing(newListing).then(data => setListings([...listings, data]));
  }

  function handleChanges(editedListing) {
    const index = listings.findIndex(
      listing => listing._id === editedListing.id
    );
    setListings([
      ...listings.slice(0, index),
      editedListing,
      ...listings.slice(index + 1)
    ]);
  }

  function handleFavourise(id) {
    toggleFavourites(localUsers[1]._id, id).then(data =>
      setFavourites(data.favourites)
    );
  }

  function findDetails(id) {
    return listings.find(listing => listing._id === id);
  }

  function findFavourites() {
    return listings.slice().filter(listing => favourites.includes(listing._id));
  }
  let userListings = [];
  function findUserListings() {
    getListingsByUserId(localUsers[1]._id).then(data => {
      userListings = data.listings;
    });
    return userListings;
  }

  function handleTypeFilter(type) {
    setTypeFilter(type);
  }

  function handleDelete(id) {
    const indexListing = listings.findIndex(listing => listing._id === id);
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
    //history.push(`${users[1].username}/search/${searchParam}`);
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
              <Home
                listings={listings}
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
              <CreateForm handlePublish={handlePublish} {...props} />
            )}
          />
          <Route
            path="/:username/favourites"
            render={() => (
              <FavouritesList
                listings={findFavourites()}
                onFavourise={handleFavourise}
                favourites={favourites}
              />
            )}
          />
          <Route
            path="/details/:id"
            render={props => (
              <DetailsPage
                content={findDetails(props.match.params.id)}
                onFavourise={handleFavourise}
                favourites={favourites}
                {...props}
              />
            )}
          />
          <Route
            path="/:username/search/:searchParam"
            render={() => (
              <SearchResult
                listings={searchResult}
                onFavourise={handleFavourise}
                favourites={favourites}
              />
            )}
          />
          <Route
            path="/:username/listings"
            render={props => (
              <ListingOverview
                listings={findUserListings()}
                onDelete={handleDelete}
                onSaveChanges={handleChanges}
                {...props}
              />
            )}
          />
        </GridMain>
        <GridFooter>
          <Footer username={localUsers[1].username} />
        </GridFooter>
      </GridBody>
    </BrowserRouter>
  );
}

export default App;
