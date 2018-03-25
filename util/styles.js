import {StyleSheet} from 'react-native';
import {black, brown, blue, white, red, gray} from "../util/colors";

export default styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    justifyContent: 'space-around', 
    alignItems: 'stretch',
    marginTop: 5,
    marginBottom: 5,
    marginRight: 5,
    marginLeft: 5,
    paddingTop: 15,
    paddingBottom: 15
  },
  top:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottom:{
    flex: 1,
    justifyContent: 'space-around',
    paddingRight: 30,
    paddingLeft: 30
  },
  deckTitle: {
    fontSize: 22,
    color: black,
    fontWeight: 'bold'
  },
  deckSubtitle: {
    fontSize: 18,
    color: brown
  },
  genericButton:{
    textAlign: 'center',
    color: white,
    backgroundColor: black,
    borderWidth: 2,
    borderRadius: 5,
    paddingTop: 15,
    paddingBottom: 15,
    fontSize: 18
  },
  inverseButton:{
    backgroundColor: white,
    borderColor: black,
    color: black
  },
  errorMsg: {
    color: red,
    fontSize: 16
  },
  inputText: {
    height: 50, 
    borderColor: gray, 
    borderWidth: 1,
    borderRadius: 5
  }
})