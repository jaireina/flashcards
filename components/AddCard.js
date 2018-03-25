import React, {Component} from 'react';
import {AppLoading} from 'expo';
import {Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import styles from '../util/styles';
import { addCard } from '../util/api';
import { addCard as addNewCard, prepareForAddingCard} from '../actions';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
    errors: {
      question: false,
      answer: false
    }
  }

  textInputChange = (field, text)=>{
    this.setState(previousState => (
      {
        ...previousState,
        [field]:text, 
        errors:{
          ...previousState.errors,
          [field]: !this.isInputValid(field, text)
        }
      }
    ));
  }

  isInputValid = (field, text, showError=false)=>{
    const hasError = text.trim()==='';
    if(showError){
      this.setState({errors:{[field]:hasError}});
    }
    return !hasError;
  }
  
  submitForm = () =>{
    const {question, answer} = this.state;
    
    if( !this.isInputValid('question', question, true) 
        || !this.isInputValid('answer', answer, true) ){
      return;
    }

    const newQuestion = {question, answer};
    const {deck} = this.props.navigation.state.params;

    this.props.notifyAddingCard();

    addCard(deck.id, newQuestion)
      .then(response => {
        this.props.addNewCard(deck.id, newQuestion);
        this.refs.questionInput.clear();
        this.refs.answerInput.clear();
        this.props.navigation.goBack();
      });
    
    
  }

  render() {
    const {errors} = this.state;
    const {showLoader} = this.props;

    if(showLoader) {
      return <AppLoading />;
    }

    return (
      <KeyboardAvoidingView style={styles.mainContainer} contentContainerStyle={styles.mainContainer} behavior='padding'>
        <View style={[styles.top, {flex:2, alignItems:'stretch'}]}>
          <TextInput
              style={styles.inputText}
              onChangeText={(text)=>this.textInputChange('question', text)}
              value={this.state.question}
              ref={'questionInput'}
              placeholder='Question'
            />
          {
            errors.question && <Text style={styles.errorMsg}>Invalid question format</Text>
          }

          <View style={{height: 30}} />

          <TextInput
              style={styles.inputText}
              onChangeText={(text)=>this.textInputChange('answer', text)}
              value={this.state.answer}
              ref={'answerInput'}
              placeholder='Answer'
            />
          {
            errors.answer && <Text style={styles.errorMsg}>Invalid answer format</Text>
          }
        </View>
        <View style={styles.bottom}>
          <TextButton onPress={this.submitForm}>Submit</TextButton>
        </View>  
      </KeyboardAvoidingView>
    ) 
  }
}

function mapStateToProps({appState}){
  return {
    showLoader: appState.isCardBeingAdded
  }
}

function mapDispatchToProps(dispatch){
  return {
    addNewCard: (deckId, card)=> dispatch(addNewCard(deckId, card)),
    notifyAddingCard: () => dispatch(prepareForAddingCard())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AddCard);