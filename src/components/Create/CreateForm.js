import axios from 'axios';
import Label from '../common/FormElements/Label';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactComponent as LoadIcon } from '../../svg/loadingIcon.svg';
import styled from 'styled-components';
import { TextInput, Textarea } from '../common/FormElements/Input';
import TypeButton from './TypeButton';

const CLOUDNAME = process.env.REACT_APP_CLOUDINARY_CLOUDNAME;
const PRESET = process.env.REACT_APP_CLOUDINARY_PRESET;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
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
  display: flex;
  margin: 10px;
  flex-direction: column;
  padding: 5px;
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

function CreateForm({ handlePublish, history }) {
  const [listingType, setListingType] = useState('give away');
  const [image, setImage] = useState(
    'https://res.cloudinary.com/doirkiciq/image/upload/v1558965891/Sorry-noImg_iwodnp.png'
  );
  const [date] = useState(moment().format('dddd, MMMM Do YYYY'));
  const [isAddImage, setAddImage] = useState(false);
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const types = ['give away', 'swap', 'for sale'];

  function onPublish(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const price = form.price === undefined ? '' : form.price.value;
    const img = image;
    handlePublish(title, description, listingType, img, price, date);
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
      <Label htmlFor="description">Description</Label>
      <StyledTextarea
        type="textarea"
        placeholder="type description here..."
        id="description"
        name="description"
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
      <StyledButton>PUBLISH</StyledButton>
    </StyledForm>
  );
}
CreateForm.propTypes = {
  handlePublish: PropTypes.func,
  history: PropTypes.object
};
export default CreateForm;
