import React, { useState } from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';
import Label from '../../misc/Label';
import { TextInput } from '../../misc/Input';
import Fuse from 'fuse.js';
import FeedGrid from '../../misc/FeedGrid';

const StyledHome = styled.section``;

const StyledSearchBar = styled.div`
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
`;

function HomeFeed({
  listings,
  users,
  onFavourise,
  favourites,
  onTypeFilter,
  typeFilter,
  handleSearch,
  history
}) {
  const [filteredListings, setFilteredListings] = useState(
    listings.filter(
      listing => typeFilter === 'all' || listing.type === typeFilter
    )
  );
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
      keys: ['title', 'description'],
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
        <Label htmlFor="filter">
          <i className="fas fa-search" /> Filter for type
        </Label>
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
        <Label>Search For</Label>
        <TextInput
          type="text"
          placeholder="Search here..."
          onKeyPress={event => event.charCode === 13 && onKeyPressSearch(event)}
        />
      </StyledSearchBar>
      <FeedGrid>
        {filteredListings.map(listing => (
          <ListingItem
            key={listing.id}
            content={listing}
            user={users.find(user => user.id_ === listing.user)}
            onFavourise={() => onFavourise(listing.id)}
            isFavourite={favourites.includes(listing.id)}
          />
        ))}
      </FeedGrid>
    </StyledHome>
  );
}

HomeFeed.propTypes = {
  listings: PropTypes.array,
  favourites: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func,
  onTypeFilter: PropTypes.func,
  typeFilter: PropTypes.string,
  handleSearch: PropTypes.func,
  history: PropTypes.object
};

export default HomeFeed;
