export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const PREPARE_TO_ADD_DECK = 'PREPARE_TO_ADD_DECK';

/**
 * Receives the decks list after getting it from the storage source.
 * @param {Array} decks list
 */
export function receiveDecks(decks){
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

/**
 * Adds a new deck to the list
 * @param {Object} deck that was added
 */
export function addDeck(deck){
  return {
    type: ADD_DECK,
    deck
  }
}

export function prepareForAddingDeck(){
  return {
    type: PREPARE_TO_ADD_DECK
  }
}