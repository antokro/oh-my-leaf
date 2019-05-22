import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import img from '../../img/mike-marquez-445115-unsplash.jpg';

const StyledListing = styled.div`
  background: #fcfbf6;
  height: 255px;
  display: grid;
  grid-template-rows: 120px 60px 35px 40px;
  width: 156px;
  border-radius: 11px;
  box-shadow: 3px 3px 9px -2px #c9cac8;
  margin: 15px 10px;
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
  width: 60%;
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

function ListingItem(props) {
  const { title, type } = props.content;
  return (
    <StyledListing>
      <StyledImg>
        <img src={img} alt="a plant" style={{ height: 120 }} />
      </StyledImg>
      <StyledTitle>{title}</StyledTitle>
      <StyledType>{type}</StyledType>
      <StyledUser>
        User 1
        <i
          className="fas fa-map-marker-alt"
          style={{ marginLeft: 3, marginRight: 3 }}
        />
        Hamburg
      </StyledUser>
    </StyledListing>
  );
}

ListingItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  user: PropTypes.string
};

export default ListingItem;
