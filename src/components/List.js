import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../common/theme';
import Marker from './Marker';
import config from '../config';
import Loader from './Loader';

const Container = styled.section`
  overflow: auto;
  max-height: 100%;
`;

const DetailsWrapper = styled.div`
  display: none;

  background: ${theme.white};
  color: ${theme.accent};
`;

const Details = styled.div`
  padding: 1rem;

  > * + * {
    margin-top: 1rem;
  }

  a {
    font-weight: bold;
    color: ${theme.accent};
  }
`;

const Wrapper = styled.div`
  color: ${theme.accent};

  &.active,
  &:hover {
    background: ${theme.accent};
    color: ${theme.background};
  }

  &.active {
    ${DetailsWrapper} {
      display: block;
    }
  }
`;

const Element = styled(NavLink)`
  padding: 1rem;

  display: flex;
  align-items: center;
  text-decoration: none;

  color: currentColor;
  &:hover,
  &.active {
    color: ${theme.background};
  }

  * + * {
    margin-left: 1rem;
  }

  & + & {
    border-top: 2px solid ${theme.accent};
  }

  &:last-child {
    border-bottom: 2px solid ${theme.accent};
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
`;

const Back = styled(NavLink)`
  display: block;

  border-top: 2px solid ${theme.accent};
  border-bottom: 2px solid ${theme.accent};

  background: ${theme.accent};
  color: ${theme.background};

  &:hover {
    background: ${theme.background};
    color: ${theme.accent};
  }
`;

class List extends Component {
  constructor(props) {
    super(props);

    this.activeElement = React.createRef();
  }

  componentDidUpdate(previousProps) {
    const { placeKey } = this.props;

    if (placeKey && previousProps.placeKey !== placeKey) {
      if (this.activeElement) {
        const bounding = this.activeElement.current.getBoundingClientRect();
        const inViewPort =
          bounding.top >= 0 &&
          bounding.left >= 0 &&
          bounding.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          bounding.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (!inViewPort) {
          this.activeElement.current.scrollIntoView();
        }
      }
    }
  }

  render() {
    const { availableCities, cityKey, placeKey, fetching } = this.props;

    const places = availableCities[cityKey] || [];
    const city = config.cities[cityKey];

    return (
      <Container>
        {fetching ? (
          <Loader />
        ) : (
          places.map(place => {
            const link = `https://www.google.com/maps/search/${place.name
              .split(' ')
              .join('+')}+${place.address
              .split(' ')
              .join('+')}+${city.name.split(' ').join('+')}`;

            return (
              <Wrapper
                key={place.key}
                className={placeKey === place.key ? 'active' : ''}
                ref={placeKey === place.key ? this.activeElement : null}
              >
                <Element to={`/${cityKey}/${place.key}`}>
                  <Marker place={place} />
                  <span>{place.name}</span>
                </Element>

                <DetailsWrapper>
                  <Details>
                    <div>
                      Indirizzo:{' '}
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {place.address}
                      </a>
                    </div>
                    <div>
                      Note: <span>{place.notes}</span>
                    </div>
                  </Details>
                  <Back to={`/${cityKey}`}>
                    <Icon>
                      <FontAwesomeIcon icon="chevron-up" />
                    </Icon>
                  </Back>
                </DetailsWrapper>
              </Wrapper>
            );
          })
        )}
      </Container>
    );
  }
}

export default List;
