import React, { useState } from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
const listingsArray = require('../FeedPage/mockAdvertisements.json');

const StyledAdFeed = styled.section`
  margin: 10px;
  display: flex;
`;

function ListingFeed() {
  const [listings, setListings] = useState(listingsArray || []);

  return (
    <StyledAdFeed>
      {listings.map(listing => (
        <ListingItem key={listing.id} content={listing} />
      ))}
    </StyledAdFeed>
  );
}
export default ListingFeed;
