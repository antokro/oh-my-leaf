import axios from 'axios';
import Label from '../common/FormElements/Label';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactComponent as LoadIcon } from '../../svg/loadingIcon.svg';
import styled from 'styled-components';
import { TextInput, Textarea } from '../common/FormElements/Input';
import TypeButton from './TypeButton';
import SwapTags from './SwapTags';
import {
  Form,
  Button,
  ImgIcon,
  AddImg,
  ImgPreview,
  TypeButtonGroup,
  PriceInputWrapper
} from '../common/FormElements/Forms';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const StyledFileInput = styled(TextInput)`
  color: #201f1d;
  font-size: 12px;
  margin: 5px;
`;

const StyledLoadIcon = styled(LoadIcon)`
  height: 50px;
`;

const StyledPriceInput = styled(TextInput)`
  margin: 9px 0;
`;

function CreateForm({ handlePublish, history }) {
  const [date] = useState(moment().format('dddd, MMMM Do YYYY'));
  const [image, setImage] = useState(
    'https://res.cloudinary.com/doirkiciq/image/upload/v1558965891/Sorry-noImg_iwodnp.png'
  );
  const [isAddImage, setAddImage] = useState(false);
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [type, setType] = useState('give away');
  const [swapTags, setSwapTags] = useState(['Cactus', 'exotic plants']);

  const types = ['give away', 'swap', 'for sale'];

  function onPublish(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const price = form.price === undefined ? '' : form.price.value;

    handlePublish(title, description, type, image, price, date, swapTags);
    form.reset();
    history.push('/');
  }

  function handleTypeButtonClick(event) {
    const type = event.target.value;
    setType(type);
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
    <Form onSubmit={onPublish}>
      <Label htmlFor="title">Title</Label>
      <TextInput
        type="text"
        placeholder="type title here..."
        id="title"
        name="title"
      />
      <Label htmlFor="description">Description</Label>
      <Textarea
        type="textarea"
        placeholder="type description here..."
        id="description"
        name="description"
      />
      <AddImg>
        <ImgIcon onClick={onAddImage} className="far fa-images" />
        {isAddImage && (
          <StyledFileInput onChange={uploadImage} type="file" name="file" />
        )}
        {isImageUploading && <StyledLoadIcon />}
        {isUploadSuccess && <ImgPreview src={image} alt="uploaded image" />}
      </AddImg>
      <Label>Listing Type</Label>
      <TypeButtonGroup>
        {types.map(type => (
          <TypeButton
            handleClick={handleTypeButtonClick}
            value={type}
            key={type}
            filled={type}
          />
        ))}
      </TypeButtonGroup>
      {type === 'for sale' && (
        <PriceInputWrapper>
          <Label htmlFor="price">Price in €</Label>
          <StyledPriceInput id="price" name="price" />
        </PriceInputWrapper>
      )}
      {type === 'swap' && (
        <SwapTags
          tags={swapTags}
          onDelete={handleTagDelete}
          onInput={handleTagInput}
        />
      )}
      <Button>PUBLISH</Button>
    </Form>
  );
}
CreateForm.propTypes = {
  handlePublish: PropTypes.func,
  history: PropTypes.object
};
export default CreateForm;
