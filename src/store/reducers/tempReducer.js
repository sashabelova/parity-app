import * as actionTypes from '../actions/actionTypes';

const initialState = {
  temp: [],
  error: false
};

const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SUCCESS:
      return {
        ...state,
        temp: state.temp.concat(action.temp),
        error: false
      };

    case actionTypes.GET_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default articlesReducer;
