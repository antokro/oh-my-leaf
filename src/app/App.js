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
  getListingsByUserId,
  editListing,
  deleteListing
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
const currentUser = localUsers[1];

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
  const [userListings, setUserListings] = useState([]);
  const [dbReply, setDbReply] = useState('Sorry, please try again');
  const [isNotified, setIsNotified] = useState(false);

  useEffect(() => {
    getData('listings')
      .then(data => setListings(data))
      .catch(error => console.log(error));

    setLocal('localUsers', localUsers);

    getFavouritesByUserId(currentUser._id).then(favourites => {
      setFavourites(favourites);
    });

    getListingsByUserId(currentUser._id).then(data => {
      setUserListings(data.listings);
    });
  }, []);

  useEffect(() => setLocal('typeFilter', typeFilter), [typeFilter]);

  function handlePublish(title, description, type, image, price, swapTags) {
    const newListing = {
      title,
      description,
      type,
      user_id: currentUser._id,
      img_path: image,
      price,
      swap_tags: swapTags
    };
    postListing(newListing).then(text => {
      getData('listings')
        .then(data => setListings(data))
        .catch(error => console.log(error));
      getListingsByUserId(currentUser._id).then(data => {
        setUserListings(data.listings);
      });
      setDbReply(text);
      showNotification();
    });
  }

  function handleChanges(editedListing) {
    editListing(editedListing).then(text => {
      setDbReply(text);
      showNotification();
      getData('listings')
        .then(data => setListings(data))
        .catch(error => console.log(error));
      getListingsByUserId(currentUser._id).then(data => {
        setUserListings(data.listings);
      });
    });
  }

  function handleFavourise(id) {
    toggleFavourites(currentUser._id, id).then(data =>
      setFavourites(data.favourites)
    );
  }

  function findDetails(id) {
    return listings.find(listing => listing._id === id);
  }

  function findFavourites() {
    return listings.slice().filter(listing => favourites.includes(listing._id));
  }

  function handleTypeFilter(type) {
    setTypeFilter(type);
  }

  function handleDelete(id) {
    deleteListing(id).then(text => {
      setDbReply(text);
      showNotification();
      getData('listings')
        .then(data => setListings(data))
        .catch(error => console.log(error));
      getListingsByUserId(currentUser._id).then(data => {
        setUserListings(data.listings);
      });
    });
  }

  function showSearchResults(results, history, searchParam) {
    setSearchResult(results);
    history.push(`${currentUser.username}/search/${searchParam}`);
  }

  function showNotification() {
    setIsNotified(true);
    setTimeout(() => setIsNotified(false), 4900);
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
              <CreateForm
                handlePublish={handlePublish}
                {...props}
                username={currentUser.username}
              />
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
            render={() => (
              <ListingOverview
                listings={userListings}
                onDelete={handleDelete}
                onSaveChanges={handleChanges}
                notification={dbReply}
                isNotified={isNotified}
              />
            )}
          />
        </GridMain>
        <GridFooter>
          <Footer username={currentUser.username} />
        </GridFooter>
      </GridBody>
    </BrowserRouter>
  );
}

export default App;
