import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import img from '../../img/mike-marquez-445115-unsplash.jpg';

const StyledAd = styled.div`
  background: #fcfbf6;
  height: 229px;
  display: grid;
  grid-template-rows: 119px 40px 35px 35px;
  width: 156px;
  border-radius: 11px;
  box-shadow: 3px 3px 9px -2px #c9cac8;
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
  margin: 9px;
  font-size: 15px;
`;

function AdItem(props) {
  const { title, type } = props.content;
  return (
    <StyledAd>
      <StyledImg>
        <img src={img} alt="a plant" style={{ height: 119 }} />
      </StyledImg>
      <StyledTitle>{title}</StyledTitle>
      <StyledType>{type}</StyledType>
      <StyledUser>{'User 1, Hamburg'}</StyledUser>
    </StyledAd>
  );
}

AdItem.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  user: PropTypes.string,
  image: PropTypes.string
};

export default AdItem;
