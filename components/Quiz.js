import React, {Component} from 'react';
import {AppLoading} from 'expo';
import {Text, View, TouchableOpacity} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation';
import {connect} from 'react-redux';
import TextButton from './TextButton';
import styles from '../util/styles';


function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function CardSideView(props){
  return(
    <View style={styles.top}>
      <Text style={styles.deckTitle}>{props.text}</Text>
      <TouchableOpacity
        onPress={props.onLinkPress}>
        <Text style={styles.errorMsg}>{props.linkText}</Text>
      </TouchableOpacity>
    </View>
  );
}

class Quiz extends Component {
  state = {
    currentQuestion: {},
    visibleAnswer: "",
    showingQuestion: true,
    currentQuestionIndex: -1,
    showResults: false
  }

  componentDidMount(){
    this.correctAnswers = 0;
    this.iterate();
  }

  iterate = ()=>{
    let {deck} = this.props;
    let {currentQuestionIndex} = this.state;
    currentQuestionIndex++;

    if(currentQuestionIndex < deck.questions.length){
      let currentQuestion = deck.questions[currentQuestionIndex];
      let visibleAnswer = deck.questions[getRandomInt(deck.questions.length-1)].answer;
      this.setState({
        currentQuestion,
        currentQuestionIndex,
        visibleAnswer,
        showingQuestion: true
      });
    }else{
      this.setState({showResults: true});
    }

  }

  handleAddCard = ()=>{
    this.props.navigation.navigate(
      'AddCard',
      {deck: this.state.deck}
    );
  }

  flipCard = ()=>{
    this.setState(prevState => ({
      ...prevState,
      showingQuestion: !prevState.showingQuestion
    }));
  }

  submitAnswer = (answer)=>{
    const {visibleAnswer, currentQuestion} = this.state;
    if((visibleAnswer === currentQuestion.answer ) == answer){
      this.correctAnswers++;
    }
    this.iterate();
  }

  restart = ()=>{
    const {deck} = this.props;
    this.setState({
      currentQuestion: deck.questions[0],
      visibleAnswer: deck.questions[0].answer,
      showingQuestion: true,
      currentQuestionIndex: 0,
      showResults: false
    });
  }

  render() {
    const {deck} = this.props;
    let {
      currentQuestionIndex, 
      showingQuestion, 
      visibleAnswer, 
      currentQuestion,
      showResults
    } = this.state;

    if(deck.id===undefined) {
      return <AppLoading />;
    }

    return (
      <View style={styles.mainContainer}>
        {
          showResults ?
            <View />
            :
            <View style={styles.bottom}>
              <Text>{currentQuestionIndex+1}/{deck.questions.length}</Text>
            </View>
        }

        {
          showResults ?
            <CardSideView 
              text={`Results: ${this.correctAnswers}/${deck.questions.length}`}
              linkText=""
              />
            :
            showingQuestion?
              //Show question side
              <CardSideView 
                text={currentQuestion.question}
                linkText="Answer"
                onLinkPress={this.flipCard}
                />
              :
              //show answer side
              <CardSideView 
                text={visibleAnswer}
                linkText="Question"
                onLinkPress={this.flipCard}
                />
        }

        <View style={[styles.bottom,{flex: 2}]}>
          {
            showResults?
              <View>
                <TextButton 
                  style={[styles.inverseButton,{marginBottom: 15}]}
                  onPress={this.restart}
                  >Restart Quiz</TextButton>

                <TextButton
                  style={[styles.genericButton]}
                  onPress={()=>this.props.navigation.navigate('Home')}
                  >Back to Deck</TextButton>
              </View>
              :
              showingQuestion?
                <View />
                :
                <View>
                  <TextButton 
                    style={[styles.genericButton, styles.greenButton, {marginBottom: 15}]}
                    onPress={()=>this.submitAnswer(true)}
                    >Correct</TextButton>

                  <TextButton
                    style={[styles.genericButton, styles.redButton]}
                    onPress={()=>this.submitAnswer(false)}
                    >Incorrect</TextButton>
                </View>
          }
        </View>
      </View>
    ) 
  }
}

function mapStateToProps({decks},{navigation}){
  return {
    deck: decks.find(deck => deck.id === navigation.state.params.deckId)
  }
}

export default connect(mapStateToProps)(Quiz);