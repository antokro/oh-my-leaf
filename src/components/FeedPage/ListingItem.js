import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link as Listing } from 'react-router-dom';
import TypeTag from '../../misc/TypeTag';

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
  grid-template-rows: 120px 60px 35px 40px;
  text-decoration: none;

  &:visited {
    color: #201f1d;
    text-decoration: none;
  }
`;
const StyledImgWrapper = styled.div`
  grid-row: 1;
  background-image: url(${props => props.img});
  background-size: cover;
`;

const StyledTitle = styled.p`
  font-size: 20px;
  grid-row: 2;
  margin: 9px;
  text-align: start;
`;
const StyledType = styled(TypeTag)`
  margin: 3px 9px;
  grid-row: 3;
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
  const { title, type, id, img } = props.content;
  const { city } = props.user;
  const { onFavourise, isFavourite } = props;

  return (
    <Wrapper>
      <StyledHeart
        onClick={onFavourise}
        className={isFavourite ? 'fas fa-heart' : 'far fa-heart'}
        color={isFavourite ? '#E79796' : '#201f1d'}
      />
      <StyledListing to={`/details/${id}`}>
        <StyledImgWrapper img={img} />
        <StyledTitle>
          {title.length > 18 ? title.slice(0, 18) + '...' : title}
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
  id: PropTypes.string,
  img: PropTypes.string,
  onFavourise: PropTypes.func,
  content: PropTypes.object,
  user: PropTypes.object
};

export default ListingItem;
