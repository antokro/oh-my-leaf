import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input, Textarea } from '../../misc/Input';
import axios from 'axios';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  border: 2px solid #abc38e;
  height: 32px;
  margin: 10px 0;
`;

const StyledTextarea = styled(Textarea)`
  height: 150px;
  margin: 10px 0;
`;

const StyledInputButtonGroup = styled.div``;

const StyledLabel = styled.label`
  padding: 5px;
`;

const StyledInputButton = styled(Input)`
  background-color: ${props => (props.filling ? '#ffd084' : 'transparent')};
  border: 2px solid #ffd084;
  margin: 8px;
`;

const StyledButton = styled.button`
  background-color: #abc38e;
  border-radius: 11px;
  font-family: 'PT Mono', monospace;
  font-size: 20px;
  margin-top: 15px;
  padding: 9px;
`;

const StyledImgButton = styled.i`
  color: #abc38e;
  font-size: 30px;
`;

const StyledAddImg = styled.div``;

const StyledFileInput = styled(Input)`
  color: #201f1d;
`;

function CreateListing({ handlePublish, history }) {
  const [listingType, setListingType] = useState('give away');
  const [image, setImage] = useState('');
  const [addImage, setAddImage] = useState(false);

  function onPublish(event) {
    event.preventDefault();
    const form = event.target;
    const title = event.target.title.value;
    const description = event.target.description.value;
    const img = image;
    handlePublish(title, description, listingType, img);
    form.reset();
    history.push('/');
  }

  function handleTypeButtonClick(event) {
    const type = event.target.value;
    setListingType(type);
  }

  function onAddImage() {
    setAddImage(!addImage);
  }

  function uploadImage(event) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;

    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', PRESET);

    axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(onImageSave)
      .catch(err => console.error(err));
  }

  function onImageSave(response) {
    setImage(response.data.url);
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
      <StyledAddImg>
        <StyledImgButton onClick={onAddImage} className="far fa-images" />
        <div>{addImage ? <StyledFileInput type="file" /> : ''}</div>
      </StyledAddImg>
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
