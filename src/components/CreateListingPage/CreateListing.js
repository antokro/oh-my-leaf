import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Input, Textarea } from '../../misc/Input';
import axios from 'axios';
import Label from '../../misc/Label';
import { ReactComponent as LoadIcon } from '../../img/loadingIcon.svg';

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

const StyledImgIcon = styled.i`
  color: #abc38e;
  font-size: 30px;
`;

const StyledAddImg = styled.div`
  padding: 5px;
  display: flex;
  margin: 10px;
  flex-direction: column;
`;

const StyledFileInput = styled.input`
  color: #201f1d;
  border: 2px solid #abc38e;
  border-radius: 11px;
  font-size: 12px;
  margin: 5px;
`;

const ImgPreview = styled.img`
  max-width: 60px;
  max-height: 60px;
`;

const StyledLoadIcon = styled(LoadIcon)`
  height: 50px;
`;

function CreateListing({ handlePublish, history }) {
  const [listingType, setListingType] = useState('give away');
  const [image, setImage] = useState(
    'https://res.cloudinary.com/doirkiciq/image/upload/v1558965891/Sorry-noImg_iwodnp.png'
  );
  const [isAddImage, setAddImage] = useState(false);
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

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
    setAddImage(!isAddImage);
  }

  function uploadImage(event) {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDNAME}/upload`;
    const formData = new FormData();
    formData.append('file', event.target.files[0]);
    formData.append('upload_preset', PRESET);
    setIsImageUploading(true);
    axios
      .post(url, formData, {
        headers: { 'Content-type': 'multipart/form-data' }
      })
      .then(onImageSave)
      .catch(err => console.error(err));
  }

  function onImageSave(response) {
    setIsImageUploading(false);
    setUploadSuccess(!isUploadSuccess);
    setImage(response.data.url);
  }

  return (
    <StyledForm onSubmit={onPublish}>
      <Label htmlFor="title">Title</Label>
      <StyledInput
        type="text"
        placeholder="type title here..."
        id="title"
        name="title"
      />
      <StyledAddImg>
        <StyledImgIcon onClick={onAddImage} className="far fa-images" />
        {isAddImage && (
          <StyledFileInput onChange={uploadImage} type="file" name="file" />
        )}
        {isImageUploading && <StyledLoadIcon />}

        {isUploadSuccess && <ImgPreview src={image} alt="uploaded image" />}
      </StyledAddImg>
      <Label htmlFor="description">Description</Label>
      <StyledTextarea
        type="textarea"
        placeholder="type description here..."
        id="description"
        name="description"
      />
      <Label>Listing Type</Label>
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
