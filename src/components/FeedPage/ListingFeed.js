import React from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';

const StyledAdFeed = styled.section`
  display: flex;
`;

function ListingFeed({ listings }) {
  return (
    <StyledAdFeed>
      {listings.map(listing => (
        <ListingItem key={listing.id} content={listing} />
      ))}
    </StyledAdFeed>
  );
}
export default ListingFeed;
