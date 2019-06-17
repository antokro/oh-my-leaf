import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledInputButton = styled.input`
  background-color: ${props => (props.filling ? '#ffd084' : 'transparent')};
  border: 2px solid #ffd084;
  border-radius: 11px;
  font-family: 'PT Mono', monospace;
  font-size: 18px;
  margin: 8px;
  padding: 5px;
`;

function TypeButton(props) {
  const { onClick, value, filled } = props;
  return (
    <StyledInputButton
      onClick={onClick}
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
