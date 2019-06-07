import Label from '../../components/common/FormElements/Label';
import React from 'react';
import styled from 'styled-components';
import { SwapTag } from '../common/FormElements/Tags';

const StyledTagInputWrapper = styled.section`
  display: flex;
  flex-direction: column;
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

function SwapTags({ tags, onDelete, onInput }) {
  return (
    <StyledTagInputWrapper>
      <Label htmlFor="swaps">Swap against (seperate by comma)</Label>
      <StyledTagInput>
        <StyledTags>
          {tags.map(tag => (
            <SwapTag key={tag}>
              {tag} <StyledDelete onClick={() => onDelete(tag)}>x</StyledDelete>
            </SwapTag>
          ))}
        </StyledTags>
        <StyledTagInputField
          id="swaps"
          name="swaps"
          placeholder="type new tag here..."
          onInput={event => event.target.value.includes(',') && onInput(event)}
        />
      </StyledTagInput>
    </StyledTagInputWrapper>
  );
}

export default SwapTags;
