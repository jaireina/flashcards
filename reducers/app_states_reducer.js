import {
  PREPARE_TO_ADD_DECK,
  ADD_DECK
} from '../actions';

const initialState = {
  isDeckBeingAdded: false
}

function app_states_reducer(state=initialState, action){
  switch(action.type){
    case PREPARE_TO_ADD_DECK:
      return {...state, isDeckBeingAdded: true}
    case ADD_DECK:
      return {...state, isDeckBeingAdded: false};
    default:
      return state;
  }
  
}

export default app_states_reducer;