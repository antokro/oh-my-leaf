import React from 'react';
import styled from 'styled-components';
import logo from '../../img/Logo-oh-my-leaf.png';

const StyledHeader = styled.header`
  background: #fcfbf6;
  font-size: 28px;
  font-family: 'Give You Glory', cursive;
  text-align: center;
`;

function Header() {
  return (
    <StyledHeader>
      <img
        src={logo}
        alt="logo"
        style={{ height: 30, marginRight: 5, marginTop: 10 }}
      />
      Oh my leaf
    </StyledHeader>
  );
}

export default Header;
