import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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
  background-color: ${props => (props.filling ? '#ffd084' : 'transparent')};
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

function CreateListing({ handlePublish, history }) {
  const [listingType, setListingType] = useState('give away');

  function onPublish(event) {
    event.preventDefault();
    const form = event.target;
    const title = event.target.title.value;
    handlePublish(title, listingType);
    form.reset();
    history.push('/home');
  }

  function handleTypeButtonClick(event) {
    const type = event.target.value;
    setListingType(type);
  }

  return (
    <StyledForm onSubmit={onPublish}>
      <StyledLabel htmlFor="title">Title</StyledLabel>
      <StyledInput
        type="text"
        placeholder="type title here..."
        id="title"
        name="title"
      />
      <StyledLabel>Listing Type</StyledLabel>
      <StyledInputButtonGroup>
        <StyledInputButton
          onClick={handleTypeButtonClick}
          type="button"
          value="give away"
          filling={listingType === 'give away' ? true : false}
        />
        <StyledInputButton
          onClick={handleTypeButtonClick}
          type="button"
          value="swap"
          filling={listingType === 'swap' ? true : false}
        />
        <StyledInputButton
          onClick={handleTypeButtonClick}
          type="button"
          value="for sale"
          filling={listingType === 'for sale' ? true : false}
        />
      </StyledInputButtonGroup>
      <StyledButton>PUBLISH</StyledButton>
    </StyledForm>
  );
}
CreateListing.propTypes = {
  handlePublish: PropTypes.func
};
export default CreateListing;
