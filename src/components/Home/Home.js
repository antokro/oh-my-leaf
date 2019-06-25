import FeedGrid from '../common/Grid/FeedGrid';
import Listing from '../common/Listing/Listing';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledHome = styled.section``;

function Home({ listings, onFavourise, favourites, typeFilter }) {
  const listingsHome = listings.filter(
    listing => typeFilter === 'all' || listing.type === typeFilter
  );
  const [filteredListings, setFilteredListings] = useState(listingsHome);
  useEffect(() => setFilteredListings(listingsHome), [listingsHome]);

  return (
    <StyledHome>
      <FeedGrid>
        {filteredListings.map(listing => (
          <Listing
            key={listing._id}
            content={listing}
            onFavourise={() => onFavourise(listing._id)}
            isFavourite={favourites.includes(listing._id)}
          />
        ))}
      </FeedGrid>
    </StyledHome>
  );
}

Home.propTypes = {
  listings: PropTypes.array,
  favourites: PropTypes.array,
  onFavourise: PropTypes.func,
  onTypeFilter: PropTypes.func,
  typeFilter: PropTypes.string
};

export default Home;
