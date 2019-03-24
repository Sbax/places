import { connect } from 'react-redux';
import initGapi from '../actions/gapiActions';
import fetchCity from '../actions/citiesActions';
import Root from '../components/Root';

const mapStateToProps = ({ gapiReducer, citiesReducer }) => ({
  gapiReady: gapiReducer.gapiReady,
  availableCities: citiesReducer.cities,
});

const mapDispatchToProps = {
  initGapi,
  fetchCity,
};

const GapiContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);

export default GapiContainer;
