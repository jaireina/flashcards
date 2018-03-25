import {
  RECEIVE_DECKS, 
  ADD_DECK,
  ADD_CARD
} from '../actions';

const initialState = [
  {
    id: "React",
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  {
    id: "JavaScript",
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
]


function decks_reducer(state=initialState, action){
  switch(action.type){
    case RECEIVE_DECKS:
      return action.decks;
    case ADD_DECK:
      return [...state, action.deck];
    case ADD_CARD:
      const deckIndex = state.findIndex(el => el.id === action.deckId);
      const newState = [...state];
      newState[deckIndex].questions.push(action.card);
      return [...newState];
    default:
      return state;
  }
  
}

export default decks_reducer;