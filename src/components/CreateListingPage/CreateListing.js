import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border: 2px solid #abc38e;
  border-radius: 11px;
  height: 32px;
  margin: 10px 0;
  padding: 5px;
  font-size: 18px;
`;

const StyledTextarea = styled.textarea`
  border: 2px solid #abc38e;
  border-radius: 11px;
  height: 150px;
  margin: 10px 0;
  padding: 5px;
  font-size: 18px;
`;

const StyledInputButtonGroup = styled.div``;

const StyledLabel = styled.label`
  padding: 5px;
`;

const StyledInputButton = styled.input`
  background-color: ${props => (props.filling ? '#ffd084' : 'transparent')};
  border: 2px solid #ffd084;
  border-radius: 11px;
  font-family: 'PT Mono', monospace;
  margin: 8px;
  padding: 8px;
  font-size: 15px;
`;

const StyledButton = styled.button`
  background-color: #abc38e;
  border-radius: 11px;
  font-family: 'PT Mono', monospace;
  font-size: 20px;
  margin-top: 15px;
  padding: 9px;
`;

function CreateListing({ handlePublish, history }) {
  const [listingType, setListingType] = useState('give away');

  function onPublish(event) {
    event.preventDefault();
    const form = event.target;
    const title = event.target.title.value;
    const description = event.target.description.value;
    handlePublish(title, description, listingType);
    form.reset();
    history.push('/');
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
      <StyledLabel htmlFor="description">Description</StyledLabel>
      <StyledTextarea
        type="textarea"
        placeholder="type description here..."
        id="description"
        name="description"
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
  handlePublish: PropTypes.func,
  history: PropTypes.object
};
export default CreateListing;
