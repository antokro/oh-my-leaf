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
  border-radius: 11px;
  background: #ffd084;
  margin: 10px;
  padding: 5px 6px;
`;

const StyledDescription = styled.p`
  padding: 15px 3px;
  line-height: 1.5em;
`;

const Image = styled.img`
  width: 100%;
`;

const StyledUser = styled.p`
  font-size: 15px;
  margin: 3px 9px;
  align-self: center;
`;

const StyledUserIcon = styled.i`
  margin: 0 5px;
  font-size: 30px;
`;

const StyledIcon = styled.i`
  margin: 0 3px 0 5px;
`;

function ListingDetails(props) {
  const { title, description, type } = props.content;
  return (
    <StyledListingDetails>
      <Image src={img} alt="a plant" />
      <StyledTitle>{title}</StyledTitle>
      <StyledType>{type}</StyledType>
      <StyledDescription>{description}</StyledDescription>
      <StyledUser>
        <StyledUserIcon className="far fa-smile" />
        User 1
        <StyledIcon className="fas fa-map-marker-alt" />
        Hamburg
      </StyledUser>
    </StyledListingDetails>
  );
}
ListingDetails.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string
};

export default ListingDetails;
