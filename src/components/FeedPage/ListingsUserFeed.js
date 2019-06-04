import React from 'react';
import styled from 'styled-components';
import Icon from '../../misc/Icon';

const StyledListingWrapper = styled.div`
  display: flex;
`;

function ListingUserFeed({ listings }) {
  return (
    <>
      {listings.map(listing => (
        <StyledListingWrapper>
          <h3>{listing.title}</h3>
          <Icon className="far fa-trash-alt" />
          <Icon className="far fa-edit" />
        </StyledListingWrapper>
      ))}
    </>
  );
}

export default ListingUserFeed;
