import React, {Component} from 'react';
import {AppLoading} from 'expo';
import {Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import styles from '../util/styles';

class NewDeck extends Component {
  state = {
    showLoader: false
  }

  render() {
    
    const {showLoader} = this.state;

    if(showLoader) {
      return <AppLoading />;
    }

    return (
      <View style={styles.mainContainer}>
        <View style={styles.top}>
          <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.bottom}>
          <TextButton>Submit</TextButton>
        </View>
      </View>
    ) 
  }
}



function mapDispatchToProps(dispatch){
  return {
    decks: ()=>{} 
  }
}

export default connect(null,mapDispatchToProps)(NewDeck);