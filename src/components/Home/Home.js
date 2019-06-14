import FeedGrid from '../common/Grid/FeedGrid';
import Fuse from 'fuse.js';
import Label from '../common/FormElements/Label';
import Listing from '../common/Listing/Listing';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { TextInput } from '../common/FormElements/Input';
import SearchIcon from '../../svg/iconfinder_icon-111-search_314807.svg';

const StyledHome = styled.section``;

const StyledSearchBar = styled.section`
  display: grid;
  font-family: 'PT Mono', monospace;
`;

const StyledSelect = styled.select`
  border: 2px solid #abc38e;
  border-radius: 11px;
  font-family: 'PT Mono', monospace;
  font-size: 15px;
  margin-top: 5px;
  padding: 3px;
  background-color: transparent;
`;

const StyledTextInput = styled(TextInput)`
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  background-position: 325px 4px;
`;

function Home({
  listings,
  onFavourise,
  favourites,
  onTypeFilter,
  typeFilter,
  handleSearch,
  history
}) {
  const listingsHome = listings.filter(
    listing => typeFilter === 'all' || listing.type === typeFilter
  );
  const [filteredListings, setFilteredListings] = useState(listingsHome);
  const [showFilter, setShowFilter] = useState(false);
  useEffect(() => setFilteredListings(listingsHome), [listingsHome]);
  function onChangeTypeSelect(event) {
    const filter = event.target.value;
    onTypeFilter(filter);
    setFilteredListings(
      listings.filter(listing => filter === 'all' || listing.type === filter)
    );
  }
  function onKeyPressSearch(event) {
    const searchParam = event.target.value;
    var options = {
      keys: ['title', 'description', 'tags'],
      minMatchCharLength: 3,
      threshold: 0.3,
      maxPatternLength: 32,
      shouldSort: true
    };
    var fuse = new Fuse(filteredListings, options);
    const results = fuse.search(searchParam);
    handleSearch(results, history, searchParam);
  }

  return (
    <StyledHome>
      <StyledSearchBar>
        <Label htmlFor="filter" onClick={() => setShowFilter(!showFilter)}>
          <i className="fas fa-filter" /> Filter for type &#709;
        </Label>
        {showFilter && (
          <StyledSelect
            id="filter"
            defaultValue={typeFilter}
            onChange={onChangeTypeSelect}
          >
            <option value="all">all</option>
            <option value="give away">give away</option>
            <option value="swap">swap</option>
            <option value="for sale">for sale</option>
          </StyledSelect>
        )}
        <StyledTextInput
          type="text"
          placeholder="Search here..."
          onKeyPress={event => event.charCode === 13 && onKeyPressSearch(event)}
        />
      </StyledSearchBar>
      <FeedGrid>
        {filteredListings.map(listing => (
          <Listing
            key={listing._id}
            content={listing}
            onFavourise={() => onFavourise(listing._id)}
            isFavourite={favourites.includes(listing._id)}
          />
        ))}
      </FeedGrid>
    </StyledHome>
  );
}

Home.propTypes = {
  listings: PropTypes.array,
  favourites: PropTypes.array,
  onFavourise: PropTypes.func,
  onTypeFilter: PropTypes.func,
  typeFilter: PropTypes.string,
  handleSearch: PropTypes.func,
  history: PropTypes.object
};

export default Home;
