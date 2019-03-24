import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../common/theme';

const Main = styled.main`
  font-size: 2rem;
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: ${theme.background};

  text-align: center;

  a {
    text-decoration: none;
    background: ${theme.accent};
    color: ${theme.background};

    &:hover {
      color: ${theme.accent};
      background: ${theme.background};
      text-decoration: underline;
    }
  }
`;

const Details = styled.section`
  margin-top: 1em;
  font-size: 1.2rem;

  > * + * {
    margin-top: 0.5rem;
  }
`;

const Icon = styled.span``;

const Button = styled(NavLink)`
  display: inline-block;

  color: ${theme.accent};
  border: 2px solid ${theme.accent};
  padding: 0.8rem;
  margin-top: 1.5rem;

  &:hover {
    background: ${theme.accent};
    color: ${theme.background};
  }
`;

const icons = ['❤️', '☕️', '🍺', '🍕'];

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: 0,
    };
  }

  componentDidMount() {
    this.timing = window.setInterval(() => {
      const { icon } = this.state;

      this.setState({
        icon: (icon + 1) % icons.length,
      });
    }, 1500);
  }

  componentWillUnmount() {
    window.clearInterval(this.timing);
  }

  render() {
    const { icon } = this.state;

    return (
      <Main>
        <section>
          Fatto con <Icon>{icons[icon]}</Icon> da{' '}
          <a href="http://mb.maletta.space">me</a>
        </section>
        <Details>
          <div>
            Fortemente ispirato da{' '}
            <a href="https://onthegrid.city">onthegrid.city</a>
          </div>
          <div>
            Il codice sorgente è disponibile su{' '}
            <a href="https://github.com/Sbax/places">Github</a>
          </div>
          <div>
            Se hai suggerimenti o consigli scrivimi su{' '}
            <a href="https://telegram.me/sbaxxx">telegram</a>
          </div>

          <Button to="/">Torna al sito!</Button>
        </Details>
      </Main>
    );
  }
}

export default About;
