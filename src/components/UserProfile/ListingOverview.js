import EditForm from '../Edit/EditForm';
import Icon from '../common/Icon/StyledIcon';
import { Link as Listing } from 'react-router-dom';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledListingOverview = styled.section``;

const StyledListingWrapper = styled.section`
  align-items: center;
  border: 2px solid #abc38e;
  border-radius: 11px;
  font-size: 15px;
  margin: 8px 0;
  padding: 5px;
`;

const StyledTitle = styled.h3`
  padding: 0;
  margin: 5px 0;
`;

const StyledShowIcon = styled(Listing)`
  color: #abc38e;
  font-size: 25px;
  margin: 5px;
  text-decoration: none;
`;

const StyledNotification = styled.div`
  position: absolute;
  background-color: lightgray;
  padding: 5px;
  bottom: 8%;
  left: 80px;
  justify-self: center;
  font-size: 12px;
  animation: fadeOut 5s ease-in-out;
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    30% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

function ListingOverview({
  listings,
  onDelete,
  onSaveChanges,
  notification,
  isNotified
}) {
  const [editMode, setEditMode] = useState(false);
  const [editedListing, setEditedListing] = useState({});

  function handleDeleteClick(id) {
    onDelete(id);
  }

  function handleEditClick(id) {
    setEditMode(!editMode);
    const toEdit = listings.find(listing => listing._id === id);
    setEditedListing(toEdit);
  }

  function handleSave(listing) {
    setEditMode(!editMode);
    onSaveChanges(listing);
  }

  function handleClose() {
    setEditMode(!editMode);
  }

  return (
    <StyledListingOverview>
      {editMode ||
        listings.map(listing => (
          <StyledListingWrapper key={listing._id}>
            <StyledTitle>{listing.title}</StyledTitle>
            <Icon
              onClick={() => handleDeleteClick(listing._id)}
              className="far fa-trash-alt"
            />
            <Icon
              onClick={() => handleEditClick(listing._id)}
              className="far fa-edit"
            />
            <StyledShowIcon
              to={`/details/${listing._id}`}
              className="fas fa-eye"
            />
          </StyledListingWrapper>
        ))}
      {isNotified && <StyledNotification>{notification}</StyledNotification>}
      {editMode && (
        <EditForm
          listing={editedListing}
          onSave={listing => handleSave(listing)}
          onClose={handleClose}
        />
      )}
    </StyledListingOverview>
  );
}

ListingOverview.propTypes = {
  listings: PropTypes.array,
  onDelete: PropTypes.func,
  history: PropTypes.object,
  onSaveChanges: PropTypes.func
};

export default ListingOverview;
