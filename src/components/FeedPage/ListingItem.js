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

const StyledTitle = styled.h3`
  font-size: 20px;
  grid-row: 2;
  margin: 9px;
  text-align: start;
`;

const StyledTypeWrapper = styled.div`
  grid-row: 3;
  margin: 8px 0;
`;
const StyledType = styled(TypeTag)`
  margin: 3px 9px;
`;

const StyledPrice = styled.span``;

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
  color: ${props => (props.isFavourite ? '#E79796' : '#201f1d')};
  font-size: 20px;
  ${props =>
    props.animate
      ? props.isFavourite
        ? 'animation: isFavourite ease-in-out 0.5s'
        : 'animation: isNotFavourite ease-in-out 0.5s'
      : ''};

  @keyframes isFavourite {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.6);
    }
    80% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes isNotFavourite {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.6);
    }
    80% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`;

class ListingItem extends React.Component {
  state = {
    animate: false
  };

  componentDidUpdate(prevProps) {
    const { isFavourite } = this.props;
    if (prevProps.isFavourite !== isFavourite) {
      this.setState({ animate: true });
    }
  }

  render() {
    const { user, onFavourise, content, isFavourite } = this.props;
    const { title, type, id, img, price } = content;
    const { city } = user;
    const { animate } = this.state;

    function onClickFavourise(id) {
      onFavourise(id);
    }
    return (
      <Wrapper>
        <StyledHeart
          onClick={() => onClickFavourise(id)}
          className={isFavourite ? 'fas fa-heart' : 'far fa-heart'}
          isFavourite={isFavourite}
          animate={animate}
        />
        <StyledListing to={`/details/${id}`}>
          <StyledImgWrapper img={img} />
          <StyledTitle>
            {title.length >= 15 ? title.slice(0, 15) + '...' : title}
          </StyledTitle>
          <StyledTypeWrapper>
            <StyledType>{type}</StyledType>
            {price !== '' && <StyledPrice>{price}€</StyledPrice>}
          </StyledTypeWrapper>
          <StyledUser>
            <StyledIcon className="fas fa-map-marker-alt" />
            {city}
          </StyledUser>
        </StyledListing>
      </Wrapper>
    );
  }
}

ListingItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  city: PropTypes.string,
  id: PropTypes.string,
  img: PropTypes.string,
  price: PropTypes.string,
  onFavourise: PropTypes.func,
  content: PropTypes.object,
  user: PropTypes.object
};

export default ListingItem;
