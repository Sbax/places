import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import { NavLink, Route } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../common/theme';
import config from '../config';
import ListContainer from '../containers/ListContainer';
import Loader from './Loader';
import Map from './Map';

const Main = styled.section``;
const Sidebar = styled.aside`
  display: flex;
  overflow: hidden;
  border-top: 2px solid ${theme.accent};
  border-left: 2px solid ${theme.accent};

  @media screen and (min-width: ${theme.screen.medium}) {
    border-top: 0;
  }

  > * {
    flex: 1 0 100%;
    transition: transform 400ms ease;
  }

  &.active {
    > * {
      transform: translateX(-100%);
    }
  }
`;

const Navigation = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background: ${theme.background};
  color: ${theme.accent};

  border-right: 2px solid ${theme.accent};

  overflow: auto;

  a {
    display: flex;
    padding: 1rem;

    text-decoration: none;

    color: ${theme.accent};

    &:hover {
      color: ${theme.background};
      background: ${theme.accent};
    }
  }

  li + li {
    border-top: 2px solid ${theme.accent};
  }

  li:last-child {
    border-bottom: 2px solid ${theme.accent};
  }
`;

const Menu = styled.section`
  background: ${theme.background};
  color: ${theme.accent};

  display: flex;
  flex-direction: column;
`;

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-rows: 2fr 1fr;
  grid-template-columns: 1fr;

  @media screen and (min-width: ${theme.screen.medium}) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr;
  }
`;

const Loading = styled.main`
  width: 100vw;
  height: 100vh;
`;

const Icon = styled.span`
  padding: 1rem;
  margin-right: 1rem;
`;

const Back = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;

  border-bottom: 2px solid ${theme.accent};

  background: ${theme.accent};
  color: ${theme.background};

  &:hover {
    ${Icon} {
      background: ${theme.background};
      color: ${theme.accent};
    }
  }
`;

const More = styled.div`
  border-top: 2px solid ${theme.accent};

  a {
    color: currentColor;
    background: ${theme.accent};
    color: ${theme.background};

    &:hover {
      background: ${theme.background};
      color: ${theme.accent};
    }
  }
`;

class Root extends Component {
  componentDidMount() {
    const { initGapi } = this.props;
    initGapi();

    ReactGA.initialize('UA-109344681-2');
    ReactGA.set({ anonymizeIp: true });
  }

  render() {
    const { gapiReady, availableCities, match } = this.props;
    if (!gapiReady)
      return (
        <Loading>
          <Loader />
        </Loading>
      );

    const defaultCenter = { lat: 43.8525872, lng: -12.8611109 };
    const defaultZoom = 3;

    const { cityKey, placeKey } = match.params;
    const city = config.cities[cityKey];

    const place =
      availableCities && availableCities[cityKey]
        ? availableCities[cityKey].find(({ key }) => key === placeKey)
        : false;

    return (
      <Container>
        <Main>
          <Route
            path="/:cityKey?"
            render={() => {
              const { center, zoom } = (() => {
                if (place) {
                  return {
                    center: { lat: place.lat, lng: place.lng },
                    zoom: 15,
                  };
                }
                return (
                  city || {
                    center: defaultCenter,
                    zoom: defaultZoom,
                  }
                );
              })();

              return <Map center={center} zoom={zoom} />;
            }}
          />
        </Main>
        <Sidebar className={city ? 'active' : ''}>
          <Navigation>
            <ul>
              {Object.entries(config.cities).map(([key, value]) => (
                <li key={key}>
                  <NavLink to={`/${key}`}>{value.name}</NavLink>
                </li>
              ))}
            </ul>

            <More>
              <NavLink to="/about">Scopri di più</NavLink>
            </More>
          </Navigation>
          <Menu>
            <Route
              path="/:cityKey"
              render={() => {
                if (!city) return <></>;
                return (
                  <>
                    <Back to="/">
                      <Icon>
                        <FontAwesomeIcon icon="chevron-left" />
                      </Icon>
                      <span>{city.name}</span>
                    </Back>
                    <ListContainer cityKey={cityKey} placeKey={placeKey} />
                  </>
                );
              }}
            />
          </Menu>
        </Sidebar>
      </Container>
    );
  }
}

export default withRouter(Root);
