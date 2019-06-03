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
  margin: 10px 0;
`;

const StyledPrice = styled.div`
  margin: 10px 0;
  font-size: 30px;
`;

const StyledDescription = styled.p`
  line-height: 1.5em;
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

const StyledGoBack = styled.div`
  margin: 5px 0;
`;

function ListingDetails({ content, creator, onDelete, history }) {
  const { title, type, description, img, id, price } = content.listing;
  const { firstname, city, userId } = content.user;

  function handleDeleteClick() {
    onDelete(id);
    history.push('/');
  }

  function handleGoBack() {
    history.goBack();
  }
  return (
    <StyledListingDetails>
      <StyledGoBack onClick={handleGoBack}>
        <i className="fas fa-arrow-circle-left" /> Go Back
      </StyledGoBack>
      <Image src={img} alt="a plant" />
      <StyledTitle>{title}</StyledTitle>
      {price !== '' && <StyledPrice>{price}€</StyledPrice>}
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
