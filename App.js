import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {TabNavigator, StackNavigator} from 'react-navigation';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import AppStatusBar from './components/AppStatusBar';

import reducers from './reducers'
import {blue, brown, white, black} from './util/colors';
import DeckList from './components/DeckList';
import DeckDetail from './components/DeckDetail';
import NewDeck from './components/NewDeck';
import AddCard from './components/AddCard';


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerStyle: {
    backgroundColor: black, 
    height: 40,
    padding: 0,
    margin: 0
  }
});


const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions:{
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions:{
      tabBarLabel: 'NEW DECK'
    }
  }
},{ 
  tabBarOptions: {
    activeTintColor: brown,
    inactiveTintColor: black,
    style: {
      height: 56,
      backgroundColor: white,
    }
  }
});

const MainNavigator = StackNavigator({
  Home:{
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: styles.headerStyle ,
      title: `${navigation.state.params.deck.title}`
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: ({navigation}) => ({
      headerTintColor: white,
      headerStyle: styles.headerStyle ,
      title: `Add Card`
    })
  }
},{});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducers)}> 
        <View style={styles.container}>
          <AppStatusBar backgroundColor={blue} barStyle='light-content'/>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
