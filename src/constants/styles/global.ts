import { DataPickerStyles } from 'componentsNewDesign/common/inputs/DateRangePicker/styles';
import { createGlobalStyle } from 'styled-components';
import { backgroundColor, grey5, lightBlack, primaryColor, textInfoColor, white, yeayColor } from './colors';
import { padding, scrollBarWidth } from './sizes';
// import normalRoboto from '../../assets/fonts/Roboto-Regular.ttf';

export const GlobalStyle = createGlobalStyle`    
  body, html, #root {
    height: 100%;
  }

  body {
    margin: 0;
    //font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    //    'Droid Sans', 'Helvetica Neue', sans-serif;
    font-family: 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }

  * {
    box-sizing: border-box;
  }

  a {
    text-decoration: none;
    color: ${textInfoColor};
  }

  ::selection {
    background: ${primaryColor};
    color: ${white};
  }

  ::-webkit-scrollbar-track
  {
    //-webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
    background-color: transparent;
  }

  ::-webkit-scrollbar
  {
    width: ${scrollBarWidth};
    height: ${scrollBarWidth};
    //background-color: white;
  }

  ::-webkit-scrollbar-thumb
  {
    background-color: ${grey5};
    border-radius: 8px;
  }

  .ant-layout-header {
    background: ${yeayColor};
  }

  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: rgb(134 247 150 / 44%);
  }

  .ant-btn-primary {
    background: ${lightBlack};
    border-color: ${lightBlack};
  }

  #root {
    background-color: ${backgroundColor};
    width: 100%;
    //min-height: 100%;
  }

  .ant-slider {
    width: 100%;
  }

  .ant-card-body {
    padding: ${padding};
  }

  .ant-descriptions-header {
    margin-bottom: 0;
  }

  .ant-descriptions-item-content {
    background: ${white};
  }

  .ant-tag {
    margin-bottom: 8px;
  }

  .site-tag-plus {
    background: ${white};
    border-style: dashed;
    cursor: pointer;
  }
  
  ${DataPickerStyles};

`;
