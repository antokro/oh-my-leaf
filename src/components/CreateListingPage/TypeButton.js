import React from 'react';
import styled from 'styled-components';

const StyledInputButton = styled.input`
  border: 2px solid #ffd084;
  margin: 8px;
  border-radius: 11px;
  font-size: 18px;
  padding: 5px;
  font-family: 'PT Mono', monospace;
  background-color: ${props => (props.filling ? '#ffd084' : 'transparent')};
`;

function TypeButton(props) {
  const { handleClick, value, filled } = props;
  return (
    <StyledInputButton
      onClick={handleClick}
      type="button"
      value={value}
      filling={value === filled}
    />
  );
}

export default TypeButton;
