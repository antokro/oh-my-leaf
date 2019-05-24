import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import img from '../../img/kara-eads-547179-unsplash.jpg';
import { Link as Listing } from 'react-router-dom';

const Wrapper = styled.div`
  position: relative;
  height: 255px;
  margin: 15px auto;
  width: 156px;
`;

const StyledListing = styled(Listing)`
  color: #201f1d;
  background: #fcfbf6;
  border-radius: 11px;
  box-shadow: 3px 3px 9px -2px #c9cac8;
  display: grid;
  text-decoration: none;
  grid-template-rows: 120px 60px 35px 40px;

  &:visited {
    color: #201f1d;
    text-decoration: none;
  }
`;
const StyledImg = styled.div`
  grid-row: 1;
`;
const Image = styled.img`
  width: 100%;
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

const StyledIcon = styled.i`
  margin: 0 3px;
`;

const StyledHeart = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  color: ${props => props.color};
  font-size: 20px;
`;

function ListingItem(props) {
  const [favourite, setFavourite] = useState(false);
  const { title, type, id } = props.content;
  const { city } = props.user;
  //<i class="fas fa-heart" />

  function onClick() {
    setFavourite(!favourite);
  }

  return (
    <Wrapper>
      <StyledHeart
        onClick={onClick}
        className={favourite ? 'fas fa-heart' : 'far fa-heart'}
        color={favourite ? '#E79796' : '#201f1d'}
      />
      <StyledListing to={`/details/${id}`}>
        <StyledImg>
          <Image src={img} alt="a plant" />
        </StyledImg>
        <StyledTitle>
          {title.length > 15 ? title.slice(0, 15) + '...' : title}
        </StyledTitle>
        <StyledType>{type}</StyledType>
        <StyledUser>
          <StyledIcon className="fas fa-map-marker-alt" />
          {city}
        </StyledUser>
      </StyledListing>
    </Wrapper>
  );
}

ListingItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  city: PropTypes.string,
  id: PropTypes.string
};

export default ListingItem;
