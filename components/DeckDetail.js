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

  componentWillMount(){
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

  startQuiz = () =>{
    this.props.navigation.navigate(
      'Quiz',
      {deckId: this.state.deck.id}
    );
  }

  render() {
    
    const {deck:{id, title, questions}} = this.state;

    if(id===undefined) {
      return <AppLoading />;
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.top}>
          <Text style={styles.deckTitle}>{title}</Text>
          <Text style={styles.deckSubtitle}>{questions.length} Cards</Text>
        </View>
        <View style={styles.bottom}>
          <TextButton 
            style={styles.inverseButton}
            onPress={this.handleAddCard}>Create New Question</TextButton>
          {
            questions.length>0?
              <TextButton
                onPress={this.startQuiz}
                >Start Quiz</TextButton>
              :
              <View />
          }
          
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