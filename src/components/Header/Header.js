import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../img/Logo-oh-my-leaf.png';
import Icon from '../../components/common/Icon/StyledIcon';

const StyledHeader = styled.header`
  background: #fcfbf6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const StyledLogo = styled.div`
  font-size: 28px;
  font-family: 'Give You Glory', cursive;
  text-align: start;
  transition: opacity 0.3s ease-in-out;
  ${props => props.isShowing && 'opacity: 0'}
`;

const StyledIcon = styled(Icon)`
  color: #201f1d;
`;

const StyledSearch = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 1px solid #201f1d;
  border-radius: 25px;
  width: 45px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  transition: width 0.3s ease-in;
  background: #fcfbf6;

  ${props => (props.isShowing ? 'width: 93%;' : '')}
`;

const StyledInput = styled.input`
  ${props =>
    props.isShowing
      ? 'display: visible; width: 85%; '
      : 'display:none; width: 0;'};
  transition: all 0.3s ease-in;
  background: #fcfbf6;
  outline: 0;
  border: 0;
  font-size: 15px;
  margin-right: 5px;
  font-family: 'PT Mono', monospace;
`;

function Header({ onKeyPressSearch }) {
  const [isShowing, setIsShowing] = useState(false);
  function handleClick() {
    setIsShowing(!isShowing);
  }

  return (
    <StyledHeader>
      <StyledLogo isShowing={isShowing}>
        <img
          src={logo}
          alt="logo"
          style={{ height: 30, marginRight: 5, marginTop: 10, marginLeft: 10 }}
        />
        Oh my leaf
      </StyledLogo>
      <StyledSearch isShowing={isShowing}>
        <StyledIcon
          className={isShowing ? 'fas fa-times' : 'fas fa-search'}
          onClick={handleClick}
        />
        {isShowing && (
          <StyledInput
            isShowing={isShowing}
            placeholder="Type here..."
            onKeyPress={event =>
              event.charCode === 13 && onKeyPressSearch(event)
            }
          />
        )}
      </StyledSearch>
    </StyledHeader>
  );
}

export default Header;
