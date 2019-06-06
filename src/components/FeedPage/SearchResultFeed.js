import FeedGrid from '../../misc/FeedGrid';
import Label from '../../misc/Label';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledSearchResultFeed = styled.section``;

function SearchResultFeed({ listings, users, onFavourise, favourites }) {
  return (
    <StyledSearchResultFeed>
      <Label>Search Results</Label>
      <FeedGrid>
        {listings.map(listing => (
          <ListingItem
            key={listing.id}
            content={listing}
            user={users.find(user => user.id_ === listing.user)}
            onFavourise={() => onFavourise(listing.id)}
            isFavourite={favourites.includes(listing.id)}
          />
        ))}
      </FeedGrid>
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
