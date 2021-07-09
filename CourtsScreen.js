import 'react-native-gesture-handler';

import React, { useState } from 'react';

import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

class CourtsScreen extends React.Component {
  
  state = {
    score: 80,
    scoreColor: '#77dd77'
  }

  render() {
    const score = this.state.score;
    return (
      <View style = {styles.background}>
        <Header />
        <Text style = {styles.head}>NOTHING TO SEE HERE YET</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#fff', 
    height: '100%'
  },

  head: {
    fontSize: 30,
    marginTop: '20%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'grey',
    paddingTop: '50%'
  },

});
export default CourtsScreen;
