import { combineReducers } from 'redux';
import { SAMPLE_ACTION } from '../actions/index';

const initialState = {
  someValue: 'yup',
};

function shrg(state = initialState, action) {
  switch (action.type) {
    case SAMPLE_ACTION:
      return Object.assign({}, state, action.value);
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  shrg,
});

export default rootReducer;
