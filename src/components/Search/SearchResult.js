import FeedGrid from '../common/Grid/FeedGrid';
import Label from '../common/FormElements/Label';
import Listing from '../common/Listing/Listing';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledSearchResult = styled.section``;

function SearchResult({ listings, users, onFavourise, favourites }) {
  return (
    <StyledSearchResult>
      <Label>Search Results</Label>
      <FeedGrid>
        {listings.map(listing => (
          <Listing
            key={listing.id}
            content={listing}
            user={users.find(user => user.id_ === listing.user)}
            onFavourise={() => onFavourise(listing.id)}
            isFavourite={favourites.includes(listing.id)}
          />
        ))}
      </FeedGrid>
    </StyledSearchResult>
  );
}

SearchResult.propTypes = {
  listings: PropTypes.array,
  favourites: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func
};

export default SearchResult;
