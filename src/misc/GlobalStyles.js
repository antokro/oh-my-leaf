import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'PT Mono', monospace;
  color: #201F1D;
  overflow:hidden;
}
`;
