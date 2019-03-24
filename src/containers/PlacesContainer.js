import { connect } from 'react-redux';
import fetchCity from '../actions/citiesActions';
import Places from '../components/Places';

const mapStateToProps = ({ citiesReducer }) => ({
  availableCities: citiesReducer.cities,
});

const mapDispatchToProps = {
  fetchCity,
};

const PlacesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Places);

export default PlacesContainer;
