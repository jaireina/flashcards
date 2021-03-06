import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {black, brown, blue} from "../util/colors";

function DeckSummary(props){
  const {deck, onPress} = props;
  return (
    <TouchableOpacity 
      onPress={()=>onPress(deck)} 
      style={styles.container}>
      <Text style={styles.title}>
        {deck.title}
      </Text>
      <Text style={styles.subtitle}>
        {deck.questions.length} Cards
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: blue,
    borderWidth: 2,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 10,
    marginLeft: 10,
    paddingTop: 15,
    paddingBottom: 15
  },
  title: {
    fontSize: 20,
    color: black
  },
  subtitle: {
    fontSize: 15,
    color: brown
  }
})

export default DeckSummary;