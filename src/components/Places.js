import React, { Component } from 'react';
import { Marker as MapBoxMarker } from 'react-mapbox-gl';
import { NavLink } from 'react-router-dom';
import Marker from './Marker';

class Places extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { fetchCity } = this.props;

    if (match.params.cityKey) fetchCity(match.params.cityKey);
  }

  componentDidUpdate(previousProps) {
    const { match } = this.props;
    const previousCity = previousProps.match.params.cityKey;

    if (match.params.cityKey !== previousCity) {
      const { fetchCity } = this.props;
      if (match.params.cityKey) fetchCity(match.params.cityKey);
    }
  }

  render() {
    const { availableCities } = this.props;
    const { match } = this.props;

    const { placeKey, cityKey } = match.params;

    const places = availableCities[cityKey] || [];
    return (
      <>
        {places.map(place => {
          const active = placeKey === place.key;

          return (
            <MapBoxMarker
              className={active ? 'active' : ''}
              key={`${place.key}}`}
              coordinates={[place.lng, place.lat]}
              minZoom={15}
            >
              <NavLink to={`/${cityKey}/${place.key}`}>
                <Marker className={active ? 'active' : ''} {...place} />
              </NavLink>
              {active && place.name}
            </MapBoxMarker>
          );
        })}
      </>
    );
  }
}

export default Places;
