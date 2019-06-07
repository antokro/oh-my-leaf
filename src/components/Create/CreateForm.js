import axios from 'axios';
import Label from '../common/FormElements/Label';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ReactComponent as LoadIcon } from '../../svg/loadingIcon.svg';
import styled from 'styled-components';
import { TextInput, Textarea } from '../common/FormElements/Input';
import TypeButton from './TypeButton';
import { SwapTag } from '../common/FormElements/Tags';

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

const StyledPriceInputWrapper = styled.section`
  animation: slideOpen 0.3s linear;
  display: flex;
  flex-direction: column;

  @keyframes slideOpen {
    from {
      height: 0;
    }
    to {
      height: 50px;
    }
  }
`;

const StyledTagInputWrapper = styled.section`
  animation: slideOpen 0.3s linear;
  display: flex;
  flex-direction: column;

  @keyframes slideOpen {
    from {
      height: 0;
    }
    to {
      height: 50px;
    }
  }
`;

const StyledTags = styled.div`
  margin: 5px 0;
  display: flex;
  flex-wrap: wrap;
`;

const StyledDelete = styled.b`
  margin-left: 3px;
`;

const StyledTagInput = styled.div`
  border: 2px solid #abc38e;
  border-radius: 11px;
  display: inline-block;
  font-family: 'PT Mono', monospace;
  font-size: 15px;
  padding: 5px;
`;

const StyledTagInputField = styled.input`
  border: 0;
  outline: 0;
  padding: 5px;
  font-size: 15px;
  font-family: 'PT Mono', monospace;
`;

function CreateForm({ handlePublish, history }) {
  const [date] = useState(moment().format('dddd, MMMM Do YYYY'));
  const [image, setImage] = useState(
    'https://res.cloudinary.com/doirkiciq/image/upload/v1558965891/Sorry-noImg_iwodnp.png'
  );
  const [isAddImage, setAddImage] = useState(false);
  const [isUploadSuccess, setUploadSuccess] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [listingType, setListingType] = useState('give away');
  const [swapTags, setSwapTags] = useState(['Cactus', 'exotic plants']);

  const types = ['give away', 'swap', 'for sale'];

  function onPublish(event) {
    event.preventDefault();
    const form = event.target;
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const price = form.price === undefined ? '' : form.price.value;
    const img = image;
    const tags = swapTags;
    handlePublish(title, description, listingType, img, price, date, tags);
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

  function handleTagInput(event) {
    const tag = event.target.value.split(',');
    tag[0] === '' || setSwapTags([...swapTags, tag[0]]);
    event.target.value = '';
  }

  function deleteTag(tag) {
    const index = swapTags.indexOf(tag);
    setSwapTags([...swapTags.slice(0, index), ...swapTags.slice(index + 1)]);
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
          <Label htmlFor="price">Price in €</Label>
          <StyledPriceInput id="price" name="price" />
        </StyledPriceInputWrapper>
      )}
      {listingType === 'swap' && (
        <StyledTagInputWrapper>
          <Label htmlFor="swaps">Swap against (seperate by comma)</Label>
          <StyledTagInput>
            <StyledTags>
              {swapTags.map(tag => (
                <SwapTag key={tag}>
                  {tag}{' '}
                  <StyledDelete onClick={() => deleteTag(tag)}>x</StyledDelete>
                </SwapTag>
              ))}
            </StyledTags>
            <StyledTagInputField
              id="swaps"
              name="swaps"
              placeholder="type new tag here..."
              onInput={event =>
                event.target.value.includes(',') && handleTagInput(event)
              }
            />
          </StyledTagInput>
        </StyledTagInputWrapper>
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
