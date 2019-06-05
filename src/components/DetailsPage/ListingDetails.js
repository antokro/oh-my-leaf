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
  display: flex;
  margin: 3px 0;
`;

const StyledUserIcon = styled.p`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  margin: 0 5px;
  align-items: center;
  justify-content: center;
  background: ${props => `hsl(${props.color}deg, 50%, 67%)`};
  color: white;
  font-size: 20px;
  display: flex;
`;

const StyledUserInfo = styled.p`
  margin: auto 5px;
`;

const StyledGoBack = styled.div`
  margin: 5px 0;
`;

const StyledCreationDate = styled.div`
  margin: 10px 0;
`;

function ListingDetails({ content, history }) {
  const { title, type, description, img, price, created } = content.listing;
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
        <StyledUserIcon color={icon}>
          {name.firstname.slice(0, 1)}
        </StyledUserIcon>
        <StyledUserInfo>{name.firstname}</StyledUserInfo>
        <StyledUserInfo className="fas fa-map-marker-alt" />
        <StyledUserInfo>{city}</StyledUserInfo>
      </StyledUser>
      <StyledCreationDate>Created: {created}</StyledCreationDate>
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
