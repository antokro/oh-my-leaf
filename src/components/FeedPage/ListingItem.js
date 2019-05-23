import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import img from '../../img/kara-eads-547179-unsplash.jpg';
import { Link as Listing } from 'react-router-dom';

const StyledListing = styled(Listing)`
  color: #201f1d;
  background: #fcfbf6;
  border-radius: 11px;
  box-shadow: 3px 3px 9px -2px #c9cac8;
  display: grid;
  text-decoration: none;
  grid-template-rows: 120px 60px 35px 40px;
  height: 255px;
  margin: 15px auto;
  width: 156px;

  &:visited {
    color: #201f1d;
    text-decoration: none;
  }
`;
const StyledImg = styled.div`
  grid-row: 1;
`;
const StyledTitle = styled.p`
  font-size: 20px;
  grid-row: 2;
  margin: 9px;
  text-align: start;
`;
const StyledType = styled.span`
  background: #ffd084;
  border-radius: 11px;
  margin: 3px 9px;
  grid-row: 3;
  padding: 5px 6px;
  width: 65%;
`;

const StyledUser = styled.p`
  align-self: center;
  font-size: 15px;
  grid-row: 4;
  margin: 3px 9px;
`;

const Image = styled.img`
  width: 100%;
`;

const StyledIcon = styled.i`
  margin: 0 3px;
`;

function ListingItem(props) {
  const { title, type, id } = props.content;
  return (
    <StyledListing to={`/details/${id}`}>
      <StyledImg>
        <Image src={img} alt="a plant" />
      </StyledImg>
      <StyledTitle>{title}</StyledTitle>
      <StyledType>{type}</StyledType>
      <StyledUser>
        User 1
        <StyledIcon className="fas fa-map-marker-alt" />
        Hamburg
      </StyledUser>
    </StyledListing>
  );
}

ListingItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  user: PropTypes.string,
  id: PropTypes.string
};

export default ListingItem;
