import React, {Component} from 'react';
import {AppLoading} from 'expo';
import {Text, View, TouchableOpacity} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import styles from '../util/styles';

class DeckDetail extends Component {
  state = {
    deck: {}
  }

  componentDidMount(){
    const deckParam = this.props.navigation.state.params.deck;
    const deck = this.props.decks.find(deck => deck.id === deckParam.id);
    this.setState({deck});
  }

  handleAddCard = ()=>{
    this.props.navigation.navigate(
      'AddCard',
      {deck: this.state.deck}
    );
  }

  render() {
    
    const {deck} = this.state;

    if(deck.id===undefined) {
      return <AppLoading />;
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.top}>
          <Text style={styles.deckTitle}>{deck.title}</Text>
          <Text style={styles.deckSubtitle}>{deck.questions.length} Cards</Text>
        </View>
        <View style={styles.bottom}>
          <TextButton 
            style={styles.inverseButton}
            onPress={this.handleAddCard}>Add Card</TextButton>
          <TextButton>Start Quiz</TextButton>
        </View>
      </View>
    ) 
  }
}

function mapStateToProps({decks}){
  return {
    decks 
  }
}

export default connect(mapStateToProps)(DeckDetail);