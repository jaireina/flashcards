import React from 'react';
import {Text} from 'react-native';

export function print(data){ 
  return <Text>{JSON.stringify(data)}</Text>;
}