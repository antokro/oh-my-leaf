import React from 'react';
import styled from 'styled-components';
import img from '../../img/kara-eads-547179-unsplash.jpg';
import PropTypes from 'prop-types';
import TypeTag from '../../misc/TypeTag';
import Image from '../../misc/Image';

const StyledListingDetails = styled.section``;

const StyledTitle = styled.p`
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

const StyledUser = styled.p`
  align-self: center;
  font-size: 15px;
  margin: 3px 9px;
`;

const StyledUserIcon = styled.i`
  font-size: 30px;
  margin: 0 5px;
`;

const StyledIcon = styled.i`
  margin: 0 3px 0 5px;
`;

function ListingDetails({ content }) {
  const { title, type, description } = content.listing;
  const { firstname, city } = content.user;
  return (
    <StyledListingDetails>
      <Image src={img} alt="a plant" />
      <StyledTitle>{title}</StyledTitle>
      <StyledType>{type}</StyledType>
      <StyledDescription>{description}</StyledDescription>
      <StyledUser>
        <StyledUserIcon className="far fa-smile" />
        {firstname}
        <StyledIcon className="fas fa-map-marker-alt" />
        {city}
      </StyledUser>
    </StyledListingDetails>
  );
}
ListingDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  listing: PropTypes.array,
  detailId: PropTypes.string
};

export default ListingDetails;
