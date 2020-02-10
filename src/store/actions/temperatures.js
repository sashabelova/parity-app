import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getSuccess = temp => {
  return {
    type: actionTypes.GET_SUCCESS,
    temp: temp
  };
};

export const getFailed = () => {
  return {
    type: actionTypes.GET_FAILED
  };
};

export const getTemperatures = () => {
  return dispatch => {
    axios
      .get('thermostat.json')
      .then(response => {
        dispatch(getSuccess(response.data));
      })
      .catch(error => {
        dispatch(getFailed());
      });
  };
};
