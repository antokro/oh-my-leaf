import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import TypeTag from '../../misc/TypeTag';
import Image from '../../misc/Image';

const StyledListingDetails = styled.section``;

const StyledTitle = styled.h3`
  font-size: 30px;
  margin: 15px 0;
  text-align: start;
`;

const StyledType = styled(TypeTag)`
  margin: 10px;
`;

const StyledDescription = styled.p`
  line-height: 1.5em;
  padding: 15px 3px;
`;

const StyledUser = styled.div`
  align-self: center;
  font-size: 15px;
  margin: 3px 0;
`;

const StyledUserIcon = styled.i`
  font-size: 30px;
  margin: 0 5px;
`;

const StyledLocationIcon = styled.i`
  margin: 0 3px 0 5px;
`;

const StyledDelete = styled.div`
  font-size: 15px;
  margin: 8px 0;
`;

const StyledDeleteIcon = styled.i`
  color: #abc38e;
  font-size: 30px;
  margin: 5px;
`;

function ListingDetails({ content, creator, onDelete, history }) {
  const { title, type, description, img, id } = content.listing;
  const { firstname, city, userId } = content.user;

  function handleDeleteClick() {
    onDelete(id);
    history.push('/');
  }
  return (
    <StyledListingDetails>
      <Image src={img} alt="a plant" />
      <StyledTitle>{title}</StyledTitle>
      <StyledType>{type}</StyledType>
      <StyledDescription>{description}</StyledDescription>
      <StyledUser>
        <StyledUserIcon className="far fa-smile" />
        {firstname}
        <StyledLocationIcon className="fas fa-map-marker-alt" />
        {city}
      </StyledUser>
      {creator === userId && (
        <StyledDelete>
          <StyledDeleteIcon
            className="far fa-trash-alt"
            onClick={handleDeleteClick}
          />
          Delete this listing
        </StyledDelete>
      )}
    </StyledListingDetails>
  );
}
ListingDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  firstname: PropTypes.string,
  city: PropTypes.string,
  listing: PropTypes.object,
  user: PropTypes.object,
  id: PropTypes.string,
  onDelete: PropTypes.func
};

export default ListingDetails;
