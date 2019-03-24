import actions from './actions';
import loadCity from '../common/spreadsheet';

const { FETCH_CITY, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE } = actions;

const fetchCitySuccess = ({ city, data }) => ({
  type: FETCH_CITY_SUCCESS,
  city,
  data,
});

const fetchCityFailure = () => ({
  type: FETCH_CITY_FAILURE,
});

const fetchCityAction = () => ({
  type: FETCH_CITY,
});

const fetchCity = city => {
  return (dispatch, getState) => {
    const state = getState();
    const found = state.citiesReducer.cities[city];
    if (found) {
      dispatch(fetchCitySuccess({ city, data: found }));
      return;
    }

    dispatch(fetchCityAction());

    loadCity(city, ({ data, error }) => {
      if (error) return dispatch(fetchCityFailure());
      return dispatch(fetchCitySuccess({ city, data }));
    });
  };
};

export default fetchCity;
