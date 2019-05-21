import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledAd = styled.div`
  background: #fcfbf6;
  height: 209px;
  grid-template-rows: 119px repeat(3, 30px);
`;
const StyledImg = styled.img`
  grid-row: 1;
`;
const StyledTitle = styled.p`
  grid-row: 2;
  font-size: 15px;
`;
const StyledType = styled.span`
  grid-row: 3;
  border-radius: 11px;
  background: #ffd084;
  padding: 7px;
`;
const StyledUser = styled.p`
  grid-row: 4;
`;

function AdItem(props) {
  const { content } = props;
  console.log(content.title);
  return (
    <StyledAd>
      <StyledImg href={content.img} alt="a plant" />
      <StyledTitle>{content.title}</StyledTitle>
      <StyledType>{content.type}</StyledType>
      <StyledUser>{'User 1, Hamburg'}</StyledUser>
    </StyledAd>
  );
}

AdItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string
};

export default AdItem;
