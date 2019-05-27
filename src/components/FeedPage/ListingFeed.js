import React from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';

const StyledAdFeed = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

function ListingFeed({ listings, users, onFavourise, favourites }) {
  return (
    <StyledAdFeed>
      {listings.map(listing => (
        <ListingItem
          key={listing.id}
          content={listing}
          user={users.find(user => user.userId === listing.user)}
          onFavourise={() => onFavourise(listing)}
          favourite={favourites.includes(listing)}
        />
      ))}
    </StyledAdFeed>
  );
}

ListingFeed.propTypes = {
  listings: PropTypes.array,
  users: PropTypes.array,
  onFavourise: PropTypes.func,
  favourites: PropTypes.array
};

export default ListingFeed;
