import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {AppLoading} from 'expo';
import {connect} from 'react-redux';

import DeckSummary from './DeckSummary';
import {getDecks} from '../util/api';
import {receiveDecks} from '../actions';
import {print} from '../util/helpers';


class DeckList extends Component {

  state = {
    isReady: false
  };

  componentDidMount(){
    getDecks()
      .then(results => {
        this.setState({isReady: true});
        this.props.receiveDecks(results);
      });
  }
  
  onDeckTouch = (deck)=>{
    this.props.navigation.navigate(
      'DeckDetail',
      {deck} 
    )
  } 

  renderDeck = ({item}) => {
    return <DeckSummary deck={item} onPress={this.onDeckTouch} />
  }

  render() {
    const { isReady} = this.state;    
    const { decks } = this.props;

    if(!isReady) {
      return <AppLoading />
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={decks}
          renderItem={this.renderDeck}
          keyExtractor={(item)=> item.id} 
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    paddingTop: 10
  },
  box: {
    height: 50,
    width: 50,
    backgroundColor: '#e76e63',
    margin: 10,
    flex: 1
  }
})

function mapStateToProps({decks}){
  return{
    decks
  };
}

function mapDispatchToProps(dispatch){
  return {
    receiveDecks: (decks)=> dispatch(receiveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);