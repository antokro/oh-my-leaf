import React from 'react';
import styled from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  height: 32px;
  border: 2px solid #abc38e;
  border-radius: 11px;
  margin: 5px 0;
  padding: 5px;
`;

const StyledInputButtonGroup = styled.div``;

const StyledLabel = styled.label`
  padding: 5px;
`;

const StyledInputButton = styled.input`
  border: 2px solid #ffd084;
  border-radius: 11px;
  padding: 8px;
  margin: 8px;
  background-color: transparent;
  font-family: 'PT Mono', monospace;
`;

const StyledButton = styled.button`
  background-color: #abc38e;
  border-radius: 11px;
  padding: 9px;
  font-size: 18px;
  font-family: 'PT Mono', monospace;
  margin-top: 15px;
`;

function CreateListing() {
  function onClickPublish(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title;
    console.log(title.value);
  }

  return (
    <StyledForm onSubmit={onClickPublish}>
      <StyledLabel htmlFor="title">Title</StyledLabel>
      <StyledInput
        type="text"
        placeholder="type title here..."
        id="title"
        name="title"
      />
      <StyledLabel>Listing Type</StyledLabel>
      <StyledInputButtonGroup>
        <StyledInputButton type="button" value="give away" />
        <StyledInputButton type="button" value="swap" />
        <StyledInputButton type="button" value="for sale" />
      </StyledInputButtonGroup>
      <StyledButton>PUBLISH</StyledButton>
    </StyledForm>
  );
}

export default CreateListing;
