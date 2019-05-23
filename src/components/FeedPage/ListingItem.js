import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import img from '../../img/kara-eads-547179-unsplash.jpg';

const StyledListing = styled.div`
  background: #fcfbf6;
  height: 255px;
  display: grid;
  grid-template-rows: 120px 60px 35px 40px;
  width: 156px;
  border-radius: 11px;
  box-shadow: 3px 3px 9px -2px #c9cac8;
  margin: 15px auto;
`;
const StyledImg = styled.div`
  grid-row: 1;
`;
const StyledTitle = styled.p`
  grid-row: 2;
  font-size: 20px;
  margin: 9px;
  text-align: start;
`;
const StyledType = styled.span`
  grid-row: 3;
  width: 65%;
  border-radius: 11px;
  background: #ffd084;
  margin: 3px 9px;
  padding: 5px 6px;
`;

const StyledUser = styled.p`
  grid-row: 4;
  font-size: 15px;
  margin: 3px 9px;
  align-self: center;
`;

const Image = styled.img`
  width: 100%;
`;

const StyledIcon = styled.i`
  margin: 0 3px;
`;

function ListingItem(props) {
  const { title, type } = props.content;
  const { showDetails } = props;
  return (
    <StyledListing onClick={showDetails}>
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
  showDetails: PropTypes.func
};

export default ListingItem;
