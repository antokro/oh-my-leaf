import FeedGrid from '../common/Grid/FeedGrid';
import Listing from '../common/Listing/Listing';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

function FavouritesList({ listings, onFavourise, favourites }) {
  const [favouriteListings] = useState(listings);
  return (
    <FeedGrid>
      {favouriteListings.map(listing => (
        <Listing
          key={listing._id}
          content={listing}
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
