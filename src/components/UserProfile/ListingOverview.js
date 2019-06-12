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
  opacity: ${props => props.opacity};
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

function ListingOverview({ listings, onDelete, history, onSaveChanges }) {
  const [editMode, setEditMode] = useState(false);
  const [editedListing, setEditedListing] = useState({});

  function handleDeleteClick(id) {
    onDelete(id);
    history.goBack();
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
      {listings.map(listing => (
        <StyledListingWrapper
          key={listing._id}
          opacity={editMode ? '0.1' : '1'}
        >
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
      {editMode === true && (
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
