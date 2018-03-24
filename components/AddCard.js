import React, {Component} from 'react';
import {AppLoading} from 'expo';
import {Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import styles from '../util/styles';
import {addDeck} from '../util/api';
import {addDeck as addNewDeck} from '../actions';

class AddCard extends Component {
  state = {
    showLoader: false,
    newDeckName: '',
    hasError: false,
    response:{}
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
    
    this.setState({showLoader:true});
    
    addDeck(newDeck)
      .then(response => {
        this.props.addDeck(newDeck);
        this.props.navigation.goBack();
      });
    
    
  }

  render() {
    const {showLoader, hasError} = this.state;

    if(showLoader) {
      return <AppLoading />;
    }

    return (
      <KeyboardAvoidingView style={styles.mainContainer} contentContainerStyle={styles.mainContainer} behavior='position'>
        <View style={[styles.top, {flex:2, alignItems:'stretch'}]}>
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
        <View style={styles.bottom}>
          <View>
            
            
          </View>
          <TextButton onPress={this.submitForm}>Submit</TextButton>
        </View>  
      </KeyboardAvoidingView>
    ) 
  }
}



function mapDispatchToProps(dispatch){
  return {
    addDeck: (deck)=> dispatch(addNewDeck(deck))
  }
}

export default connect(null,mapDispatchToProps)(AddCard);