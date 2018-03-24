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

const Tabs = TabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions:{
      tabBarLabel: 'DECKS'
    }
  },
  NewDeck: {
    screen: DeckList,
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
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {backgroundColor: black}
    }
  }
},{    
  // headerMode: 'none',
});

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

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
