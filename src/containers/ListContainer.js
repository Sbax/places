import { connect } from 'react-redux';
import List from '../components/List';

const mapStateToProps = ({ citiesReducer }) => ({
  availableCities: citiesReducer.cities,
  fetching: citiesReducer.fetching,
});

const mapDispatchToProps = {};

const ListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(List);

export default ListContainer;
