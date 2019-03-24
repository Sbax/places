import actions from './actions';
import config from '../config';

const { INIT_GAPI_SUCCESS, INIT_GAPI_FAILURE } = actions;

const apiKey = process.env.REACT_APP_GOOGLE_CALENDAR_API_KEY;

const initGapiSuccess = () => ({
  type: INIT_GAPI_SUCCESS,
});

const initGapiFailure = () => ({
  type: INIT_GAPI_FAILURE,
});

const initGapi = () => {
  return dispatch => {
    window.gapi.client
      .init({
        apiKey,
        discoveryDocs: config.discoveryDocs,
      })
      .then(
        () => dispatch(initGapiSuccess()),
        () => dispatch(initGapiFailure())
      );
  };
};

const initClient = () => {
  return async dispatch => {
    window.gapi.load('client', () => dispatch(initGapi()));
  };
};

export default initClient;
