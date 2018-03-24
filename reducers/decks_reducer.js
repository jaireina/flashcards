import {
  RECEIVE_DECKS, 
  ADD_DECK
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
    default:
      return state;
  }
  
}

export default decks_reducer;