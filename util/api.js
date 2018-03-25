import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './settings'

export function getDecks(){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      return results===null ? []:JSON.parse(results);
    });
}

export function getDeck(id){
  return getDecks
    .then(results=> results[id]);
}

export function addDeck(newDeck){
  return getDecks()
    .then(decks => AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify([...decks, newDeck])) )
    .catch(err => alert('There was an error. Please try again later.'));
}

export function removeAll(){
  return AsyncStorage.clear();
}

export function addCard(deckId, card){
  return getDecks()
    .then(decks => {
      const index = decks.findIndex(el=>el.id === deckId);
      decks[index].questions.push(card);
      return AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
    })
    .catch(err => alert(err));
}

//TODO
export function removeEntry (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    });
}