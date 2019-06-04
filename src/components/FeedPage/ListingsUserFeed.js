import React from 'react';
import styled from 'styled-components';
import Icon from '../../misc/Icon';

const StyledListingWrapper = styled.div`
  border: 2px solid #abc38e;
  border-radius: 11px;
  font-size: 15px;
  padding: 5px;
  align-items: center;
  margin: 8px 0;
`;

const StyledTitle = styled.h3`
  padding: 0;
  margin: 5px 0;
`;

function ListingUserFeed({ listings, onDelete, history }) {
  function handleDeleteClick(id) {
    onDelete(id);
    history.push('/');
  }

  return (
    <>
      {listings.map(listing => (
        <StyledListingWrapper key={listing.id}>
          <StyledTitle>{listing.title}</StyledTitle>
          <Icon
            onClick={() => handleDeleteClick(listing.id)}
            className="far fa-trash-alt"
          />
          <Icon className="far fa-edit" />
        </StyledListingWrapper>
      ))}
    </>
  );
}

export default ListingUserFeed;
