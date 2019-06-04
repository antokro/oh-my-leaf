import React from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';
import Label from '../../misc/Label';

const StyledSearchResultFeed = styled.section``;

const StyledListingList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

function SearchResultFeed({ listings, users, onFavourise, favourites }) {
  return (
    <StyledSearchResultFeed>
      <Label>Search Results</Label>
      <StyledListingList>
        {listings.map(listing => (
          <ListingItem
            key={listing.id}
            content={listing}
            user={users.find(user => user.userId === listing.user)}
            onFavourise={() => onFavourise(listing.id)}
            isFavourite={favourites.includes(listing.id)}
          />
        ))}
      </StyledListingList>
    </StyledSearchResultFeed>
  );
}

SearchResultFeed.propTypes = {
  listings: PropTypes.array,
  favourites: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func
};

export default SearchResultFeed;
