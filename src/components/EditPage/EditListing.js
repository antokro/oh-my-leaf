import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextInput, Textarea } from '../../misc/Input';
import Label from '../../misc/Label';
import TypeButton from '../createListingPage/TypeButton';
import { ReactComponent as LoadIcon } from '../../img/loadingIcon.svg';
import axios from 'axios';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  top: 5%;
  bottom: 5%;
  right: 5%;
  left: 5%;
  border-radius: 11px;
  padding: 5px;
  box-shadow: 3px 3px 9px -2px #c9cac8;
  overflow: scroll;
`;

const StyledInput = styled(TextInput)`
  height: 32px;
  margin: 10px 0;
`;

const StyledTextarea = styled(Textarea)`
  height: 150px;
  margin: 10px 0;
`;

const StyledTypeButtonGroup = styled.div``;

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
  margin: 5px;
`;

const StyledAddImg = styled.div`
  padding: 5px;
  display: flex;
  margin: 10px;
  flex-direction: column;
`;

const StyledFileInput = styled(TextInput)`
  color: #201f1d;
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

const StyledPriceInput = styled(TextInput)`
  margin: 9px 0;
`;

const StyledPriceInputWrapper = styled.div``;

function EditListing({ listing, handleSave }) {
  const [editedListing, setEditedListing] = useState(listing);
  const [listingType, setListingType] = useState('give away');
  const [image, setImage] = useState(listing.img);
  const [isAddImage, setAddImage] = useState(false);
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const types = ['give away', 'swap', 'for sale'];
  function onSave(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price === undefined ? '' : form.price.value;
    const img = image;

    handleSave(title, description, listingType, img, price);
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
    <StyledForm onSubmit={onSave}>
      <Label htmlFor="title">Title</Label>
      <StyledInput
        onChange={event =>
          setEditedListing({ ...editedListing, title: event.target.value })
        }
        type="text"
        id="title"
        name="title"
        defaultValue={listing.title}
      />
      <Label htmlFor="description">Description</Label>
      <StyledTextarea
        onChange={event =>
          setEditedListing({
            ...editedListing,
            description: event.target.value
          })
        }
        type="textarea"
        id="description"
        name="description"
        defaultValue={listing.description}
      />
      <StyledAddImg>
        <StyledImgIcon onClick={onAddImage} className="far fa-images" />
        {isAddImage && (
          <StyledFileInput onChange={uploadImage} type="file" name="file" />
        )}
        {isImageUploading && <StyledLoadIcon />}
        {isUploadSuccess && <ImgPreview src={image} alt="uploaded image" />}
      </StyledAddImg>
      <Label>Listing Type</Label>
      <StyledTypeButtonGroup>
        {types.map(type => (
          <TypeButton
            handleClick={handleTypeButtonClick}
            value={type}
            key={type}
            filled={listingType}
          />
        ))}
      </StyledTypeButtonGroup>
      {listingType === 'for sale' && (
        <StyledPriceInputWrapper>
          <Label>Price in €</Label>
          <StyledPriceInput id="price" name="price" />
        </StyledPriceInputWrapper>
      )}
      <StyledButton>SAVE CHANGES</StyledButton>
    </StyledForm>
  );
}

EditListing.propTypes = {
  handlePublish: PropTypes.func,
  history: PropTypes.object
};

export default EditListing;
