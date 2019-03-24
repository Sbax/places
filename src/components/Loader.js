import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../common/theme';

const LoaderContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoaderObject = styled.div`
  display: inline-block;
  position: relative;
  width: 4em;
  height: 4em;

  div {
    position: absolute;
    top: 1.6875em;
    width: 0.6875em;
    height: 0.6875em;
    background: ${theme.accent};
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 0.375em;
    animation: loading1 0.6s infinite;
  }

  div:nth-child(2) {
    left: 0.375em;
    animation: loading2 0.6s infinite;
  }

  div:nth-child(3) {
    left: 1.625em;
    animation: loading2 0.6s infinite;
  }

  div:nth-child(4) {
    left: 2.8125em;
    animation: loading3 0.6s infinite;
  }

  @keyframes loading1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes loading3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes loading2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(19px, 0);
    }
  }
`;

class Loader extends Component {
  render() {
    return (
      <LoaderContainer>
        <LoaderObject>
          <div />
          <div />
          <div />
          <div />
        </LoaderObject>
      </LoaderContainer>
    );
  }
}

export default Loader;
