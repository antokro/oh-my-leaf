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

const StyledUserIcon = styled.span`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin: 0 5px;
  background: ${props => `hsl(${props.color}deg, 50%, 67%)`};
`;

const StyledLocationIcon = styled.i`
  margin: 0 3px 0 5px;
`;

const StyledGoBack = styled.div`
  margin: 5px 0;
`;

function ListingDetails({ content, history }) {
  const { title, type, description, img, price } = content.listing;
  const { name, city, icon } = content.user;

  function handleGoBack() {
    history.goBack();
  }
  return (
    <StyledListingDetails>
      <StyledGoBack onClick={handleGoBack}>
        <i className="fas fa-arrow-circle-left" /> Go Back
      </StyledGoBack>
      <Image src={img} alt="plant" />
      <StyledTitle>{title}</StyledTitle>
      {price !== '' && <StyledPrice>{price}€</StyledPrice>}
      <StyledType>{type}</StyledType>
      <StyledDescription>{description}</StyledDescription>
      <StyledUser>
        <StyledUserIcon color={icon}>X</StyledUserIcon>
        {name.firstname}
        <StyledLocationIcon className="fas fa-map-marker-alt" />
        {city}
      </StyledUser>
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
  user: PropTypes.object
};

export default ListingDetails;
