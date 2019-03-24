import actions from '../actions/actions';

const { INIT_GAPI_SUCCESS } = actions;

const defaultState = {
  gapiReady: false,
};

const actionHandlers = {
  [INIT_GAPI_SUCCESS](state) {
    return { ...state, gapiReady: true };
  },
};

const gapiReducer = (state = defaultState, action) => {
  const actionHandler = actionHandlers[action.type];
  if (actionHandler) return actionHandler(state, action);

  return state;
};

export default gapiReducer;
