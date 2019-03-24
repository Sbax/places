import React, { Component } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import PlacesContainer from '../containers/PlacesContainer';
import theme from '../common/theme';

const accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const MapBox = ReactMapboxGl({
  accessToken,
});

const StyledMapBox = styled(MapBox)`
  color: ${theme.accent};
  .active {
    z-index: 9 !important;
    font-size: 1.25rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

class Places extends Component {
  render() {
    const { center, zoom } = this.props;

    return (
      <StyledMapBox
        // eslint-disable-next-line react/style-prop-object
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100%',
          width: '100%',
        }}
        center={[center.lng, center.lat]}
        zoom={[zoom]}
        movingMethod="jumpTo"
      >
        <Route path="/:cityKey/:placeKey?" component={PlacesContainer} />
      </StyledMapBox>
    );
  }
}

export default Places;
