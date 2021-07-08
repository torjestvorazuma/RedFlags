import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import ReactDOM from "react-dom";
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import Header from './components/Header';
import HomeScreen from './HomeScreen';

class ResearchScreen extends React.Component {
  render() {
    return (
      <View>
        <Text style={styles.head}>Новая страница</Text>
        <Button title="Вернуться назад" onPress={() => this.props.navigation.navigate('Home')} />
      </View>
    );
  }
}


const styles = StyleSheet.create({
  head: {
    fontSize: 15,
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  input: {
    fontSize: 15,
    paddingTop: 250,
    borderBottomWidth: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  button: {
    fontSize: 15,
    paddingTop: 30,
    textAlign: 'center',
    width: '80%',
    marginLeft: '10%',
    backgroundColor: '#ceffbc'
  }

});
export default ResearchScreen;