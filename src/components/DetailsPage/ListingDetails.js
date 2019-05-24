import React from 'react';
import styled from 'styled-components';
import img from '../../img/kara-eads-547179-unsplash.jpg';
import PropTypes from 'prop-types';

const StyledListingDetails = styled.section``;

const StyledTitle = styled.p`
  font-size: 30px;
  margin: 15px 0;
  text-align: start;
`;

const StyledType = styled.span`
  background: #ffd084;
  border-radius: 11px;
  margin: 10px;
  padding: 5px 6px;
`;

const StyledDescription = styled.p`
  line-height: 1.5em;
  padding: 15px 3px;
`;

const Image = styled.img`
  width: 100%;
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

function ListingDetails(props) {
  const listing = props.content.find(listing => listing.id === props.detailId);
  const user = props.users.find(user => user.userId === listing.user);
  return (
    <StyledListingDetails>
      <Image src={img} alt="a plant" />
      <StyledTitle>{listing.title}</StyledTitle>
      <StyledType>{listing.type}</StyledType>
      <StyledDescription>{listing.description}</StyledDescription>
      <StyledUser>
        <StyledUserIcon className="far fa-smile" />
        {user.firstname}
        <StyledIcon className="fas fa-map-marker-alt" />
        {user.city}
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
