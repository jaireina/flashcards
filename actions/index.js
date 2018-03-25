export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const PREPARE_TO_ADD_DECK = 'PREPARE_TO_ADD_DECK';
export const PREPARE_TO_ADD_CARD = 'PREPARE_TO_ADD_CARD';
export const ADD_CARD = 'ADD_CARD';

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

/**
 * Adds a new card to the given deck
 * @param {string} deckId
 * @param {object} card
 */
export function addCard(deckId, card){
  return {
    type: ADD_CARD,
    deckId,
    card
  }
}

export function prepareForAddingDeck(){
  return {
    type: PREPARE_TO_ADD_DECK
  }
}

export function prepareForAddingCard(){
  return {
    type: PREPARE_TO_ADD_CARD
  }
}