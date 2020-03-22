import * as actionTypes from '../actions/action-types';

const initialState = {
  list: []
};

export default function movies(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SAVE_MOVIES:
      return {
        ...state,
        list: action.movies
      };
    default:
      return state;
  }
}
