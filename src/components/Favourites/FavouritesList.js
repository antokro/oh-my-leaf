import FeedGrid from '../common/Grid/FeedGrid';
import Listing from '../common/Listing/Listing';
import PropTypes from 'prop-types';
import React from 'react';

function FavouritesList({ listings, users, onFavourise, favourites }) {
  return (
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
  );
}

FavouritesList.propTypes = {
  listings: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func,
  favourites: PropTypes.array
};

export default FavouritesList;
