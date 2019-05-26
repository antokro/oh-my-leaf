import React from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';

const StyledListingFeed = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

function ListingFeed({ listings, users, onFavourise, favourites }) {
  return (
    <StyledListingFeed>
      {listings.map(listing => (
        <ListingItem
          key={listing.id}
          content={listing}
          user={users.find(user => user.userId === listing.user)}
          onFavourise={() => onFavourise(listing.id)}
          favourite={favourites.includes(listing.id)}
        />
      ))}
    </StyledListingFeed>
  );
}

ListingFeed.propTypes = {
  listings: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func,
  favourites: PropTypes.array
};

export default ListingFeed;
