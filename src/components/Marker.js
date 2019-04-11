import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import styled from 'styled-components';
import theme from '../common/theme';

const Circle = styled.div`
  height: 2em;
  width: 2em;
  font-size: 1.1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  color: white;

  border: 2px solid currentColor;

  &.eat {
    background: ${theme.yellow};
  }

  &.drink {
    background: ${theme.lightYellow};
  }

  &.beer {
    background: ${theme.amber};
  }

  &.see {
    background: ${theme.green};
  }

  &.museum {
    background: ${theme.red};
  }

  &.buy {
    background: ${theme.azure};
  }

  &.active {
    color: ${theme.accent};
    background: white;
  }
`;

class PlaceMarker extends Component {
  render() {
    const { icon, category, className } = this.props;
    return (
      <Circle className={`${category} ${className}`}>
        <FontAwesomeIcon icon={icon} />
      </Circle>
    );
  }
}

export default PlaceMarker;
