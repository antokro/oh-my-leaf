import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

TypeButton.propTypes = {
  handleClick: PropTypes.func,
  value: PropTypes.string,
  filled: PropTypes.string
};

export default TypeButton;
