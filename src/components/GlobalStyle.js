import { createGlobalStyle } from 'styled-components';
import theme from '../common/theme';

const GlobalStyle = createGlobalStyle`
  body {
    background: ${theme.white};
    color: ${theme.black};
    font-family: sans-serif;
  }

  * {
      box-sizing: border-box;
  }

  a {
    color: ${theme.accent};
  }
`;

export default GlobalStyle;
