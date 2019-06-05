import React from 'react';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';
import FeedGrid from '../../misc/FeedGrid';

function FavouritesFeed({ listings, users, onFavourise, favourites }) {
  return (
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
  );
}

FavouritesFeed.propTypes = {
  listings: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func,
  favourites: PropTypes.array
};

export default FavouritesFeed;
