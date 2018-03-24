import {combineReducers} from 'redux';
import decks from './decks_reducer';
import appState from './app_states_reducer';

export default combineReducers({decks, appState});