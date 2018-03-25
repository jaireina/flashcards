import {
  PREPARE_TO_ADD_DECK,
  ADD_DECK,
  PREPARE_TO_ADD_CARD,
  ADD_CARD
} from '../actions';

const initialState = {
  isDeckBeingAdded: false,
  isCardBeingAdded: false
}

function app_states_reducer(state=initialState, action){
  switch(action.type){
    case PREPARE_TO_ADD_DECK:
      return {...state, isDeckBeingAdded: true}
    case ADD_DECK:
      return {...state, isDeckBeingAdded: false};
    case PREPARE_TO_ADD_CARD:
      return {...state, isCardBeingAdded: true};
    case ADD_CARD:
      return {...state, isCardBeingAdded: false};
    default:
      return state;
  }
  
}

export default app_states_reducer;