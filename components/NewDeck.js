import React, {Component} from 'react';
import {AppLoading} from 'expo';
import {Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import styles from '../util/styles';
import {addDeck} from '../util/api';
import {addDeck as addNewDeck, prepareForAddingDeck} from '../actions';

class NewDeck extends Component {
  state = {
    newDeckName: '',
    hasError: false
  }

  textInputChange = (text)=>{
    const hasError = !this.isInputValid(text);
    this.setState(()=>({newDeckName:text, hasError}));
  }

  isInputValid = (text, showError=false)=>{
    const hasError = text.trim()==='';
    if(showError){
      this.setState({hasError});
    }
    return !hasError;
  }
  
  submitForm = () =>{
    const {newDeckName} = this.state;
    
    if(!this.isInputValid(newDeckName, true)){
      return;
    }

    const newDeck = { id: (new Date()).getTime(), 
                      title: newDeckName, 
                      questions:[]
                    };
    
    this.props.notifyAddingDeck();
    
    addDeck(newDeck)
      .then(response => {
        this.props.addDeck(newDeck);
        this.setState(prevState =>{
          this.refs.nameInput.clear();
          return {
            newDeckName: '',
            hasError: false
          };
        });
        this.props.navigation.navigate('DeckDetail',{deck: newDeck});
      });
  }

  render() {
    const {hasError} = this.state;
    const {isDeckBeingAdded} = this.props;

    if(isDeckBeingAdded) {
      return <AppLoading />;
    }

    return (
      <KeyboardAvoidingView style={styles.mainContainer} contentContainerStyle={styles.mainContainer} behavior='position'>
        <View style={[styles.top, {flex:2}]}>
          <Text style={styles.deckTitle}>What is the title of your new deck?</Text>
        </View>
        <View style={styles.bottom}>
          <View>
            <TextInput
              style={styles.inputText}
              onChangeText={this.textInputChange}
              value={this.state.newDeckName}
              ref={'nameInput'}
            />
            {
              hasError && <Text style={styles.errorMsg}>Invalid deck name</Text>
            }
          </View>
          <TextButton onPress={this.submitForm}>Submit</TextButton>
        </View>  
      </KeyboardAvoidingView>
    ) 
  }
}

function mapStateToProps({appState}){
  return {
    isDeckBeingAdded: appState.isDeckBeingAdded
  }
}

function mapDispatchToProps(dispatch){
  return {
    addDeck: (deck)=> dispatch(addNewDeck(deck)),
    notifyAddingDeck: () => dispatch(prepareForAddingDeck())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NewDeck);