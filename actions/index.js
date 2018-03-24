export const RECEIVE_DECKS = 'RECEIVE_DECKS';

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