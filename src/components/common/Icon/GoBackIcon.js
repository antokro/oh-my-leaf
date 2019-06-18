import React from 'react';
import styled from 'styled-components';

const StyledGoBack = styled.div`
  margin: 5px 0;
`;

export default function GoBackIcon({ history }) {
  function handleGoBack() {
    history.goBack();
  }

  return (
    <StyledGoBack onClick={handleGoBack}>
      <i className="fas fa-arrow-circle-left" /> Go Back
    </StyledGoBack>
  );
}
