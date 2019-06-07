import Image from '../common/Image';
import PropTypes from 'prop-types';
import React from 'react';
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

const StyledGoBack = styled.div`
  margin: 5px 0;
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

function DetailsPage({ content, history }) {
  const {
    title,
    type,
    description,
    img,
    price,
    created,
    tags
  } = content.listing;
  const { name, city, icon } = content.user;

  function handleGoBack() {
    history.goBack();
  }
  return (
    <StyledDetailsPage>
      <StyledGoBack onClick={handleGoBack}>
        <i className="fas fa-arrow-circle-left" /> Go Back
      </StyledGoBack>
      <Image src={img} alt="plant" />
      <StyledTitle>{title}</StyledTitle>
      {price !== '' && <StyledPrice>{price}€</StyledPrice>}
      <StyledType>{type}</StyledType>
      {type === 'swap' &&
        (tags !== '' && (
          <StyledTags>
            Possible swaps:
            {tags.map(tag => (
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
      <StyledCreationDate>Created: {created}</StyledCreationDate>
    </StyledDetailsPage>
  );
}
DetailsPage.propTypes = {
  history: PropTypes.object,
  listing: PropTypes.object,
  user: PropTypes.object
};

export default DetailsPage;
