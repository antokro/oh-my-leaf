import React, { useState } from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';
import Label from '../../misc/Label';

const StyledListingFeed = styled.section``;

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

const StyledListingList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function ListingFeed({
  listings,
  users,
  onFavourise,
  favourites,
  onTypeFilter,
  typeFilter
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

  return (
    <StyledListingFeed>
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
      </StyledSearchBar>
      <StyledListingList>
        {filteredListings.map(listing => (
          <ListingItem
            key={listing.id}
            content={listing}
            user={users.find(user => user.userId === listing.user)}
            onFavourise={() => onFavourise(listing.id)}
            isFavourite={favourites.includes(listing.id)}
          />
        ))}
      </StyledListingList>
    </StyledListingFeed>
  );
}

ListingFeed.propTypes = {
  listings: PropTypes.array,
  favourites: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func,
  onTypeFilter: PropTypes.func,
  typeFilter: PropTypes.string
};

export default ListingFeed;
