import Image from '../common/Image';
import GoBackIcon from '../common/Icon/GoBackIcon';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { TypeTag, SwapTag } from '../common/FormElements/Tags';

const StyledDetailsPage = styled.section``;

const StyledTitle = styled.h3`
  font-size: 30px;
  margin: 15px 0;
  text-align: start;
`;

const StyledType = styled(TypeTag)`
  margin: 10px 0;
`;

const StyledPrice = styled.div`
  margin: 10px 0;
  font-size: 30px;
`;

const StyledDescription = styled.p`
  line-height: 1.5em;
`;

const StyledUser = styled.div`
  display: flex;
  margin: 3px 0;
`;

const StyledUserIcon = styled.p`
  align-items: center;
  background: ${props => `hsl(${props.color}deg, 50%, 67%)`};
  border-radius: 50%;
  color: white;
  display: flex;
  font-size: 20px;
  height: 40px;
  justify-content: center;
  margin: 0 5px;
  width: 40px;
`;

const StyledUserInfo = styled.p`
  margin: auto 5px;
`;

const StyledCreationDate = styled.div`
  margin: 10px 0;
`;

const StyledTags = styled.div`
  padding: 5px 0;
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
  align-items: center;
`;

const StyledHeart = styled.div`
  ${props =>
    props.animate
      ? props.isFavourite
        ? 'animation: isFavourite ease-in-out 0.5s'
        : 'animation: isNotFavourite ease-in-out 0.5s'
      : ''};
  color: ${props => (props.isFavourite ? '#E79796' : '#585655')};
  font-size: 40px;
  position: absolute;
  right: 10px;
  top: 40px;

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

function DetailsPage({ content, history, onFavourise, favourites }) {
  const {
    title,
    type,
    description,
    img_path,
    price,
    createdAt,
    swap_tags,
    _id,
    user_id
  } = content;
  const { name, city, icon } = user_id;
  const [animate, setAnimate] = useState(false);

  function onClickFavourise(id) {
    setAnimate(true);
    onFavourise(id);
  }

  return (
    <StyledDetailsPage>
      <GoBackIcon history={history} />
      <StyledHeart
        onClick={() => onClickFavourise(_id)}
        className={favourites.includes(_id) ? 'fas fa-heart' : 'far fa-heart'}
        isFavourite={favourites.includes(_id)}
        animate={animate}
      />
      <Image src={img_path} alt="plant" />
      <StyledTitle>{title}</StyledTitle>
      {price !== null && <StyledPrice>{price}€</StyledPrice>}
      <StyledType>{type}</StyledType>
      {type === 'swap' &&
        (swap_tags !== [] && (
          <StyledTags>
            Possible swaps:
            {swap_tags.map(tag => (
              <SwapTag key={tag}>{tag}</SwapTag>
            ))}
          </StyledTags>
        ))}
      <StyledDescription>{description}</StyledDescription>
      <StyledUser>
        <StyledUserIcon color={icon}>
          {name.firstname.slice(0, 1)}
        </StyledUserIcon>
        <StyledUserInfo>{name.firstname}</StyledUserInfo>
        <StyledUserInfo className="fas fa-map-marker-alt" />
        <StyledUserInfo>{city}</StyledUserInfo>
      </StyledUser>
      <StyledCreationDate>Created: {createdAt.slice(0, 10)}</StyledCreationDate>
    </StyledDetailsPage>
  );
}
DetailsPage.propTypes = {
  history: PropTypes.object,
  listing: PropTypes.object,
  favourites: PropTypes.array
};

export default DetailsPage;
