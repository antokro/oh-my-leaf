import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { TypeTag } from '../FormElements/Tags';

const Wrapper = styled.section`
  position: relative;
`;

const StyledListing = styled(Link)`
  background: #fcfbf6;
  border-radius: 11px;
  box-shadow: 3px 3px 9px -2px #c9cac8;
  color: #201f1d;
  display: grid;
  grid-template-rows: 120px 40px 30px 35px 30px;
  text-decoration: none;

  &:visited {
    color: #201f1d;
    text-decoration: none;
  }
`;
const StyledImgWrapper = styled.div`
  background-image: url(${props => props.img});
  background-size: cover;
  grid-row: 1;
`;

const StyledTitle = styled.h3`
  font-size: 15px;
  grid-row: 2;
  margin: 3px 9px;
  text-align: start;
`;

const StyledTypeWrapper = styled.div`
  grid-row: 4;
  margin: 8px 0;
`;
const StyledType = styled(TypeTag)`
  font-size: 13px;
  margin: 3px 9px;
`;

const StyledPrice = styled.div`
  align-self: center;
  font-size: 13px;
  grid-row: 3;
  margin: 3px 9px;
`;

const StyledLocation = styled.p`
  align-self: center;
  font-size: 13px;
  grid-row: 5;
  margin: 3px 9px;
`;

const StyledIcon = styled.i`
  margin: 0 3px;
`;

const StyledHeart = styled.div`
  ${props =>
    props.animate
      ? props.isFavourite
        ? 'animation: isFavourite ease-in-out 0.5s'
        : 'animation: isNotFavourite ease-in-out 0.5s'
      : ''};
  color: ${props => (props.isFavourite ? '#E79796' : '#585655')};
  font-size: 25px;
  position: absolute;
  right: 5px;
  top: 5px;

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

class Listing extends React.Component {
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
    const { onFavourise, content, isFavourite } = this.props;
    const { title, type, _id, img_path, price, user_id } = content;
    const { city } = user_id;
    const { animate } = this.state;

    function onClickFavourise(id) {
      onFavourise(id);
    }
    return (
      <Wrapper>
        <StyledHeart
          onClick={() => onClickFavourise(_id)}
          className={isFavourite ? 'fas fa-heart' : 'far fa-heart'}
          isFavourite={isFavourite}
          animate={animate}
        />
        <StyledListing to={`/details/${_id}`}>
          <StyledImgWrapper img={img_path} />
          <StyledTitle>
            {title.length >= 40 ? title.slice(0, 39) + '...' : title}
          </StyledTitle>
          {price !== null && <StyledPrice>{price}€</StyledPrice>}
          <StyledTypeWrapper>
            <StyledType>{type}</StyledType>
          </StyledTypeWrapper>
          <StyledLocation>
            <StyledIcon className="fas fa-map-marker-alt" />
            <span>{city}</span>
          </StyledLocation>
        </StyledListing>
      </Wrapper>
    );
  }
}

Listing.propTypes = {
  onFavourise: PropTypes.func,
  content: PropTypes.object,
  isFavourite: PropTypes.bool
};

export default Listing;
