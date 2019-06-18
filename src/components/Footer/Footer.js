import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  font-size: 25px;

  &.active {
    color: #201f1d;
  }
`;

function Footer({ username }) {
  return (
    <StyledFooter>
      <StyledIcon exact to={'/'} className="fas fa-home" />
      <StyledIcon to={`/${username}/favourites`} className="fas fa-heart" />
      <StyledIcon to={`/${username}/listings`} className="fas fa-user" />
      <StyledIcon to={`/${username}/create`} className="fas fa-plus" />
    </StyledFooter>
  );
}
Footer.propTypes = {
  username: PropTypes.string
};
export default Footer;
