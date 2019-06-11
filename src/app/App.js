import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import { getLocal, setLocal, getData } from '../services';
import GlobalStyles from '../components/common/Styles/GlobalStyles';
import Header from '../components/Header/Header';
import Home from '../components/Home/Home';
import FavouritesList from '../components/Favourites/FavouritesList';
import CreateForm from '../components/Create/CreateForm';
import DetailsPage from '../components/Details/DetailsPage';
import Footer from '../components/Footer/Footer';
import SearchResult from '../components/Search/SearchResult';
import ListingOverview from '../components/UserProfile/ListingOverview';

const activeUser = require('./mockUsers.json');

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
    getData('listing')
      .then(data => setListings(data))
      .catch(error => console.log(error));

    setLocal('activeUser', activeUser[1]);
  }, []);

  useEffect(() => setLocal('typeFilter', typeFilter), [typeFilter]);

  function handlePublish(
    title,
    description,
    type,
    image,
    price,
    date,
    swapTags
  ) {
    const newListing = {
      title,
      description,
      type,
      user_id: getLocal('user'),
      img_path: image,
      price,
      swap_tags: swapTags
    };
    setListings([...listings, newListing]);
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
    const listing = listings.find(listing => listing._id === id);
    //const user = users.find(user => user.id_ === listing.user);
    return { listing };
  }

  function findFavourites() {
    return listings.slice().filter(listing => favourites.includes(listing._id));
  }

  function findUserListings() {
    //return listings.slice().filter(listing => listing.user === users[1]._id);
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
          <Footer username={'plant_toni'} />
        </GridFooter>
      </GridBody>
    </BrowserRouter>
  );
}

export default App;
