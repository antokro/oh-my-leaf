import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledFooter = styled.footer`
  background: #abc38e;
  height: 55px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledIcon = styled(NavLink)`
  text-decoration: none;
  color: #fcfbf6;
  font-size: 35px;
`;

function Footer() {
  return (
    <StyledFooter>
      <StyledIcon to="/" className="fas fa-home" />
      <StyledIcon to="/favourites" className="fas fa-heart" />
      <StyledIcon to="/create" className="fas fa-plus" />
    </StyledFooter>
  );
}

export default Footer;
