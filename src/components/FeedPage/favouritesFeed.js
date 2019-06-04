import React from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';

const StyledFavouritesFeed = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

function FavouritesFeed({ listings, users, onFavourise, favourites }) {
  return (
    <StyledFavouritesFeed>
      {listings.map(listing => (
        <ListingItem
          key={listing.id}
          content={listing}
          user={users.find(user => user.id_ === listing.user)}
          onFavourise={() => onFavourise(listing.id)}
          isFavourite={favourites.includes(listing.id)}
        />
      ))}
    </StyledFavouritesFeed>
  );
}

FavouritesFeed.propTypes = {
  listings: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func,
  isFavourites: PropTypes.bool
};

export default FavouritesFeed;
