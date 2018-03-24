import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY } from './settings'

export function getDecks(){
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then(results => {
      if(results === null){
        AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify([]));
        return [{"id":'firstdeck',"title":"test","questions":[{
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }]}];
      }else{
        return JSON.parse(results);
      }
    });
}

export function getDeck(id){
  return getDecks
    .then(results=> results[id]);
}


export function addDeck ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
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