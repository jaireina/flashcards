import React from 'react';
import {Text, TouchableOpacity,StyleSheet} from 'react-native';
import {white, black} from '../util/colors';
import styles from '../util/styles';

export default function TextButton({children, onPress, style={}}){
  return(
    <TouchableOpacity 
      onPress={onPress}
      >
      <Text style={[styles.genericButton, style]}>{children}</Text>
    </TouchableOpacity>
  );
}