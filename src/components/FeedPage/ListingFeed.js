import React from 'react';
import styled from 'styled-components';
import ListingItem from './ListingItem';
import PropTypes from 'prop-types';

const StyledAdFeed = styled.section`
  display: flex;
  flex-wrap: wrap;
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

ListingFeed.propTypes = {
  listings: PropTypes.array
};

export default ListingFeed;
