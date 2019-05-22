import React from 'react';
import styled from 'styled-components';
import AdItem from './AdItem';
const ads = require('../FeedPage/mockAdvertisements.json');

const StyledAdFeed = styled.section`
  padding: 20px;
  margin: 10px;
`;

function AdFeed() {
  const ad = ads[0];
  return (
    <StyledAdFeed>
      <AdItem content={ad} />
    </StyledAdFeed>
  );
}
export default AdFeed;
