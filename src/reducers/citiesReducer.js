import actions from '../actions/actions';

const defaultState = {
  cities: {},
  fetching: false,
};

const { FETCH_CITY, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE } = actions;

const actionHandlers = {
  [FETCH_CITY](state) {
    return { ...state, fetching: true };
  },
  [FETCH_CITY_SUCCESS](state, { city, data }) {
    return {
      ...state,
      cities: {
        ...state.cities,
        [city]: data,
      },
      fetching: false,
    };
  },
  [FETCH_CITY_FAILURE](state) {
    return { ...state, fetching: false };
  },
};

const citiesReducer = (state = defaultState, action) => {
  const actionHandler = actionHandlers[action.type];
  if (actionHandler) return actionHandler(state, action);

  return state;
};

export default citiesReducer;
