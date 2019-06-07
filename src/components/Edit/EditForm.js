import axios from 'axios';
import Close from '../common/Icon/CloseIcon';
import Icon from '../common/Icon/StyledIcon';
import Label from '../common/FormElements/Label';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactComponent as LoadIcon } from '../../svg/loadingIcon.svg';
import { TextInput, Textarea } from '../common/FormElements/Input';
import TypeButton from '../Create/TypeButton';
import styled from 'styled-components';
import SwapTags from '../Create/SwapTags';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const StyledForm = styled.form`
  background: white;
  border-radius: 11px;
  bottom: 5%;
  box-shadow: 3px 3px 9px -2px #c9cac8;
  display: flex;
  flex-direction: column;
  left: 5%;
  padding: 5px;
  position: absolute;
  right: 5%;
  top: 5%;
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

const StyledAddImg = styled.div`
  display: flex;
  margin: 10px;
  flex-direction: column;
  padding: 5px;
`;

const StyledFileInput = styled(TextInput)`
  color: #201f1d;
  font-size: 12px;
  margin: 5px 0;
`;

const ImgPreview = styled.img`
  max-width: 60px;
  max-height: 60px;
`;

const PreviewWrapper = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLoadIcon = styled(LoadIcon)`
  height: 50px;
`;

const StyledPriceInput = styled(TextInput)`
  margin: 9px 0;
`;

const StyledPriceInputWrapper = styled.div``;

const StyledClose = styled(Close)`
  position: absolute;
  right: 3px;
  top: 3px;
`;

function EditForm({ listing, onSave, onClose }) {
  const [editedListing, setEditedListing] = useState(listing);
  const [listingType, setListingType] = useState('give away');
  const [image, setImage] = useState(listing.img);
  const [isUploadSuccess, setUploadSuccess] = useState(true);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [swapTags, setSwapTags] = useState(listing.tags || []);

  const types = ['give away', 'swap', 'for sale'];

  function onClickSave(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value;
    const description = form.description.value;
    const price = form.price === undefined ? '' : form.price.value;
    const img = image;

    const listingEdit = {
      title,
      description,
      type: listingType,
      img,
      price,
      id: editedListing.id,
      user: editedListing.user,
      tags: swapTags
    };

    onSave(listingEdit);
  }

  function handleTypeButtonClick(event) {
    setListingType(event.target.value);
  }

  function onImgDelete() {
    setImage(
      'https://res.cloudinary.com/doirkiciq/image/upload/v1558965891/Sorry-noImg_iwodnp.png'
    );
    setUploadSuccess(!isUploadSuccess);
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

  function handleTagInput(event) {
    const tag = event.target.value.split(',');
    tag[0] === '' || setSwapTags([...swapTags, tag[0]]);
    event.target.value = '';
  }

  function handleTagDelete(tag) {
    const index = swapTags.indexOf(tag);
    setSwapTags([...swapTags.slice(0, index), ...swapTags.slice(index + 1)]);
  }

  return (
    <StyledForm onSubmit={onClickSave}>
      <StyledClose onClick={onClose}>x</StyledClose>
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
        <StyledFileInput onChange={uploadImage} type="file" name="file" />
        {isImageUploading && <StyledLoadIcon />}
        {isUploadSuccess && (
          <PreviewWrapper>
            <ImgPreview src={image} alt="uploaded image" />
            <Icon onClick={onImgDelete} className="far fa-trash-alt" />
          </PreviewWrapper>
        )}
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
      {listingType === 'swap' && (
        <SwapTags
          tags={swapTags}
          onDelete={handleTagDelete}
          onInput={handleTagInput}
        />
      )}
      <StyledButton>SAVE CHANGES</StyledButton>
    </StyledForm>
  );
}

EditForm.propTypes = {
  listing: PropTypes.object.isRequired,
  onSave: PropTypes.func,
  onClose: PropTypes.func
};

export default EditForm;
