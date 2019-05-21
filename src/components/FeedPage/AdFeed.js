import React from 'react';
//import styled from 'styled-components';
import AdItem from './AdItem';
const ads = require('../FeedPage/mockAdvertisements.json');

function AdFeed() {
  const ad = ads[0];
  return <AdItem content={ad} />;
}
export default AdFeed;
