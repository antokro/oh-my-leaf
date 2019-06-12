import FeedGrid from '../common/Grid/FeedGrid';
import Listing from '../common/Listing/Listing';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function FavouritesList({ listings, users, onFavourise, favourites }) {
  const [favouriteListings] = useState(listings);
  return (
    <FeedGrid>
      {favouriteListings.map(listing => (
        <Listing
          key={listing.id}
          content={listing}
          user={users.find(user => user.id_ === listing.user)}
          onFavourise={() => onFavourise(listing._id)}
          isFavourite={favourites.includes(listing._id)}
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
